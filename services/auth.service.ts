import { api } from "@/lib/api"
import { AuthResponse, LoginPayload, OtpPayload } from "@/types/user"

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/auth/login", payload),

  verifyOtp: (payload: OtpPayload) =>
    api.post<AuthResponse>("/auth/verify-otp", payload),
}