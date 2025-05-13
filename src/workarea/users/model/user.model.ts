import type { UserType } from "@/workarea/user-types/model/user-type.model"

export interface SimpleUser {
	id: number
	name: string
	surname: string
	email: string
	password: string
	active: boolean
	userType : UserType
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
