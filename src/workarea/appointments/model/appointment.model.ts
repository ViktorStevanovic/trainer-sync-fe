import type { Trainer, Client } from '@/workarea/users/model/user.model'

export interface Appointment {
    id: number
    trainer: Trainer
    client: Client
    availabilitySlot: AvailabilitySlot
    status: 'scheduled' | 'canceled' | 'completed'
    createdAt: string
    updatedAt: string
}

export interface ScheduleTemplate {
    id: number
    trainer: Trainer
    weekDay: 1 | 2 | 3 | 4 | 5 | 6 | 7 // More type-safe than number
    startTime: string // "08:30" (time-only, in 24h format)
    endTime: string // "12:30"
    blockTime: number // Slot duration in minutes (e.g., 60)
    active: boolean // Allow templates to be disabled
}

export interface AvailabilitySlot {
    id: number
    trainer: Trainer
    date: string // ISO date string (e.g., "2023-10-09") - more consistent than Date
    startTime: string // "09:00"
    endTime: string // "10:00"
    active: boolean // Can be deactivated by overrides
    booked: boolean
}

export interface AvailabilityOverride {
    id: number
    trainer: Trainer
    date: string // ISO date string for consistency
    fullDayOverride: boolean // If true, all slots for this date are inactive
    startTime?: string // Optional: New start time for modified slots
    endTime?: string // Optional: New end time for modified slots
    active: boolean // Whether this override is active
    reason?: string // Optional: Reason for the override (vacation, sick, etc.)
}
