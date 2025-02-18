package models

import (
	"time"

	"gorm.io/gorm"
)

type Ticket struct {
	gorm.Model
	ID            uint      `gorm:"primaryKey" json:"id"`
	EventID       uint      `gorm:"not null" json:"eventId"`
	Name          string    `gorm:"type:varchar(100);not null" json:"name"`
	Price         float64   `gorm:"not null" json:"price"`
	AvailableSeat int       `gorm:"not null" json:"availableSeat"`
	IsReleased    bool      `gorm:"not null" json:"isReleased"`
	IsClosed      bool      `gorm:"not null" json:"isClosed"`
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}
