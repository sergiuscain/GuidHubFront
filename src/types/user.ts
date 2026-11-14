export interface MeResponse {
  id: string
  username: string
  firstName: string
  lastName: string | null
  middleName: string | null
  fullName: string
  phone: string
  email: string | null
  photoUrl: string | null
  dateOfBirth: string | null
  bloodType: string | null
  isProfilePublic: boolean
}