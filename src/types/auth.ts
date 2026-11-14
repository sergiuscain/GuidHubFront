export interface AuthResponse {
  userId: string
  username: string
  isNewUser: boolean
}

export interface TelegramAuthData {
  id: number
  firstName: string | null
  lastName: string | null
  username: string | null
  photoUrl: string | null
  authDate: number
  hash: string
}