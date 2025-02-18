package controllers

import (
	"event-go-backend/config"
	"event-go-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Create Event Request Body
type CreateEventInput struct {
	Title       string    `json:"title" binding:"required"`
	Description string    `json:"description" binding:"required"`
	Location    string    `json:"location" binding:"required"`
	Image       string    `json:"image" binding:"required"`
	StartDate   time.Time `json:"startDate" binding:"required"`
	EndDate     time.Time `json:"endDate" binding:"required"`
}

// CreateEvent handles event creation
func CreateEvent(c *gin.Context) {
	var input CreateEventInput

	// Parse input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Get organizer ID from JWT token (set in AuthMiddleware)
	organizerID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	// Fetch Organizer Name
	var organizer models.User
	if err := config.DB.First(&organizer, organizerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Organizer not found"})
		return
	}

	// Create new event
	event := models.Event{
		Title:       input.Title,
		Description: input.Description,
		Location:    input.Location,
		Image:       input.Image,
		StartDate:   input.StartDate,
		EndDate:     input.EndDate,
		Organizer:   organizer.Name, // Store Organizer's Name
		OrganizerID: organizer.ID,   // Store Organizer's ID
		CreatedAt:   time.Now().UTC(),
		UpdatedAt:   time.Now().UTC(),
	}

	// Save event to database
	if err := config.DB.Create(&event).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create event"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Event created successfully",
		"success":    true,
		"data": gin.H{
			"id":          event.ID,
			"title":       event.Title,
			"description": event.Description,
			"location":    event.Location,
			"image":       event.Image,
			"startDate":   event.StartDate,
			"endDate":     event.EndDate,
			"organizer":   event.Organizer,
			"organizerId": event.OrganizerID,
			"createdAt":   event.CreatedAt,
			"updatedAt":   event.UpdatedAt,
		},
	})
}

// GetEventsByOrganizer retrieves events created by the logged-in organizer
func GetEventsByOrganizer(c *gin.Context) {
	organizerID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var events []models.Event
	if err := config.DB.Where("organizer_id = ?", organizerID).Find(&events).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve events"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Events retrieved successfully",
		"success":    true,
		"data":       events,
	})
}
