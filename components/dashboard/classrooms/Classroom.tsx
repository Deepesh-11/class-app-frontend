import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useSessionRoom } from "@/lib/hooks/useSessionRoom";

export default function ClassRoom({ sessionId, isTeacher, apiBaseUrl, onLeave }) {
  const {
    livekitCreds,
    loading,
    error,
    ending,
    handleDisconnected,
    handleEndClick,
  } = useSessionRoom({ sessionId, isTeacher, apiBaseUrl, onLeave });

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 text-sm text-gray-500">
        Connecting to class…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          Couldn't join the class: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <LiveKitRoom
        token={livekitCreds?.token}
        serverUrl={livekitCreds?.ws_url}
        connect={true}
        video={true}
        audio={true}
        onDisconnected={handleDisconnected}
        data-lk-theme="default"
        className="h-full"
      >
        <VideoConference />

        <div className="absolute top-3 right-3 z-50">
          {isTeacher ? (
            <button
              onClick={handleEndClick}
              disabled={ending}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {ending ? "Ending…" : "End session"}
            </button>
          ) : (
            <></>
          )}
        </div>
      </LiveKitRoom>
    </div>
  );
}