import { apiClient } from "@/lib/apiClient"
import type { MeResponse } from "@/types/user"
import type { AuthResponse, TelegramAuthData } from "@/types/auth"

export function getMe(): Promise<MeResponse> {
  return apiClient.get<MeResponse>("/users/me")
}

export function devLogin(username: string): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/dev-login", { username })
}

export function telegramLogin(data: TelegramAuthData): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/telegram", data)
}

export function logout(): Promise<void> {
  return apiClient.post<void>("/auth/logout")
}