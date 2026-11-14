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
}export interface UpdateMyProfileCommand {
  firstName: string
  lastName: string | null
  middleName: string | null
  phone: string
  email: string | null
  dateOfBirth: string | null
  bloodType: string | null
  isProfilePublic: boolean
  roles: string[]
}

export interface ChildDto {
  id: string
  fullName: string
  dateOfBirth: string | null
}

export interface AddChildRequest {
  fullName: string
  dateOfBirth: string | null
}

export interface BecomeGuideDto {
  bio: string | null
  paymentDetails: string | null
}