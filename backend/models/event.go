package models

import (
	"time"

	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	ID          uint           `gorm:"primaryKey" json:"id"`
	Title       string         `gorm:"type:varchar(100);not null" json:"title"`
	Description string         `gorm:"type:text" json:"description"`
	Location    string         `gorm:"type:varchar(255);not null" json:"location"`
	Image       string         `gorm:"type:text;not null" json:"image"`
	StartDate   time.Time      `gorm:"not null" json:"startDate"`
	EndDate     time.Time      `gorm:"not null" json:"endDate"`
	Capacity    int            `gorm:"not null" json:"capacity"`                       // Optional: Max attendees
	TicketPrice float64        `gorm:"type:decimal(10,2);not null" json:"ticketPrice"` // Optional: Pricing
	Organizer   string         `gorm:"type:varchar(100);not null" json:"organizer"`
	OrganizerID uint           `gorm:"not null" json:"organizerId"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	CreatedAt   time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
}
