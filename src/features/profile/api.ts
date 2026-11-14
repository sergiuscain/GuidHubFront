import { apiClient } from "@/lib/apiClient"
import type {
  AddChildRequest,
  BecomeGuideDto,
  ChildDto,
  UpdateMyProfileCommand,
} from "@/types/user"

export function updateMe(data: UpdateMyProfileCommand): Promise<void> {
  return apiClient.put<void>("/users/me", data)
}

export function deleteMe(): Promise<void> {
  return apiClient.delete<void>("/users/me")
}

export function togglePrivacy(isPublic: boolean): Promise<void> {
  return apiClient.patch<void>("/users/me/privacy", { isPublic })
}

export function getChildren(): Promise<ChildDto[]> {
  return apiClient.get<ChildDto[]>("/users/me/children")
}

export function addChild(data: AddChildRequest): Promise<{ childId: string }> {
  return apiClient.post<{ childId: string }>("/users/me/children", data)
}

export function deleteChild(childId: string): Promise<void> {
  return apiClient.delete<void>(`/users/me/children/${childId}`)
}

export function becomeGuide(data: BecomeGuideDto): Promise<{ message: string }> {
  return apiClient.post<{ message: string }>("/guides/become", data)
}