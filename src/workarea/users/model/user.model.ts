import type { UserType } from '@/workarea/user-types/model/user-type.model'

// User-Specific Data
export interface SimpleUser {
    id: number
    name: string
    surname: string
    email: string
    password: string
    active: boolean
    userType: UserType
}

export interface MinimalUser extends SimpleUser {
    createdAt: string
    createdBy: User
}

export interface User extends MinimalUser {
    token: string
    confirmedEmail: boolean
    confirmedEmailAt: string
}

// Trainer-Specific Data
export interface Trainer {
    user: SimpleUser
    certification: string | null
    hourlyRate: number | null
}

// Client-Specific Data
export interface Client {
    user: SimpleUser
    trainer: Trainer
    fitnessGoals: string | null
    medicalHistory: string | null
}
