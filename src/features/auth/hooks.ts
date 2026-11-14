import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { devLogin, getMe, logout, telegramLogin } from "./api"
import { ApiError } from "@/lib/apiClient"
import type { TelegramAuthData } from "@/types/auth"

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false
      return failureCount < 2
    },
    staleTime: 60_000,
  })
}

export function useDevLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (username: string) => devLogin(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })
}

export function useTelegramLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: TelegramAuthData) => telegramLogin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] })
    },
  })
}