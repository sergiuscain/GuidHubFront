import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addChild,
  becomeGuide,
  deleteChild,
  deleteMe,
  getChildren,
  togglePrivacy,
  updateMe,
} from "./api"
import type {
  AddChildRequest,
  BecomeGuideDto,
  UpdateMyProfileCommand,
} from "@/types/user"

export function useUpdateMe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateMyProfileCommand) => updateMe(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  })
}

export function useDeleteMe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteMe,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["me"] }),
  })
}

export function useTogglePrivacy() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (isPublic: boolean) => togglePrivacy(isPublic),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  })
}

export function useChildren() {
  return useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
  })
}

export function useAddChild() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AddChildRequest) => addChild(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["children"] }),
  })
}

export function useDeleteChild() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (childId: string) => deleteChild(childId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["children"] }),
  })
}

export function useBecomeGuide() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: BecomeGuideDto) => becomeGuide(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  })
}