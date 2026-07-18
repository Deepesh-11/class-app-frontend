import { useEffect, useState, useCallback, useRef } from "react";

interface LiveKitCreds {
  token: string;
  ws_url: string;
  room_name: string;
}

interface UseSessionRoomOptions {
  sessionId: number;
  isTeacher: boolean;
  apiBaseUrl: string;
  onLeave?: () => void;
}

export function useSessionRoom({ sessionId, isTeacher, apiBaseUrl, onLeave }: UseSessionRoomOptions) {
  const [livekitCreds, setLivekitCreds] = useState<LiveKitCreds | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ending, setEnding] = useState(false);

  // Prevents onDisconnected from double-firing /leave after the teacher's
  // explicit "End session" action already handled it.
  const actionTaken = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchCredentials() {
      setLoading(true);
      setError(null);
      try {
        const endpoint = isTeacher
          ? `${apiBaseUrl}/attendance/sessions/${sessionId}/join-as-host`
          : `${apiBaseUrl}/attendance/sessions/${sessionId}/join`;

        const res = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.detail || `Failed to join session (${res.status})`);
        }

        const data = await res.json();
        if (!data.livekit) {
          throw new Error("Session has no live room available");
        }

        if (!cancelled) setLivekitCreds(data.livekit);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCredentials();
    return () => {
      cancelled = true;
    };
  }, [sessionId, isTeacher, apiBaseUrl]);

  const leaveSession = useCallback(async () => {
    try {
      await fetch(`${apiBaseUrl}/attendance/sessions/${sessionId}/leave`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // best-effort; webhook remains the source of truth for hard disconnects
    }
  }, [apiBaseUrl, sessionId]);

  // Called by LiveKitRoom's onDisconnected — covers LiveKit's built-in
  // leave control, tab close, dropped connection, anything not routed
  // through the teacher's explicit End button.
  const handleDisconnected = useCallback(async () => {
    if (!isTeacher && !actionTaken.current) {
      await leaveSession();
    }
    onLeave?.();
  }, [isTeacher, leaveSession, onLeave]);

  // Explicit teacher "End session" button
  const handleEndClick = useCallback(async () => {
    setEnding(true);
    actionTaken.current = true;
    try {
      const res = await fetch(`${apiBaseUrl}/attendance/sessions/${sessionId}/end`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || "Failed to end session");
      }
    } catch (err) {
      console.error("Failed to end session:", err);
    } finally {
      setEnding(false);
      onLeave?.();
    }
  }, [apiBaseUrl, sessionId, onLeave]);

  return {
    livekitCreds,
    loading,
    error,
    ending,
    handleDisconnected,
    handleEndClick,
  };
}