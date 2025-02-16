package models

import (
	"time"

	"gorm.io/gorm"
)

type Role string

const (
	RoleOrganizer Role = "ORGANIZER"
	RoleAttendee  Role = "ATTENDEE"
)

type User struct {
	gorm.Model
	ID        uint       `gorm:"primaryKey" json:"id"`
	Name      string     `gorm:"type:varchar(100);not null" json:"name"`
	Email     string     `gorm:"type:varchar(150);unique;not null" json:"email"`
	Password  string     `gorm:"not null" json:"-"`
	Role      Role       `gorm:"type:varchar(20);not null" json:"role"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `gorm:"index" json:"deletedAt,omitempty"` // Soft delete enabled
}
