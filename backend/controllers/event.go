package controllers

import (
	"event-go-backend/config"
	"event-go-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

// Update Event Request Body
type UpdateEventInput struct {
	Title       *string    `json:"title"`
	Description *string    `json:"description"`
	Location    *string    `json:"location"`
	Image       *string    `json:"image"`
	StartDate   *time.Time `json:"startDate"`
	EndDate     *time.Time `json:"endDate"`
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
		DeletedAt:   gorm.DeletedAt{Time: time.Time{}},
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
func GetAllEvents(c *gin.Context) {
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

// GetAllEventsDatatable retrieves all events for homepage display
func GetAllEventsDatatable(c *gin.Context) {
	var events []models.Event
	if err := config.DB.Find(&events).Error; err != nil {
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

// GetEventByID retrieves a single event by ID
func GetEventByID(c *gin.Context) {
	eventID := c.Param("eventId")

	// Validate eventId as an integer before querying
	var event models.Event
	if err := config.DB.First(&event, eventID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Event not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Event retrieved successfully",
		"success":    true,
		"data":       event,
	})
}

// UpdateEvent updates an existing event by ID
func UpdateEvent(c *gin.Context) {
	eventID := c.Param("eventId")

	var event models.Event
	if err := config.DB.First(&event, eventID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Event not found"})
		return
	}

	var input UpdateEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	config.DB.Model(&event).Updates(input)
	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Event updated successfully",
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

// DeleteEvent deletes an event by ID
func DeleteEvent(c *gin.Context) {
	eventID := c.Param("eventId")

	// Validate event exists
	var event models.Event
	if err := config.DB.First(&event, eventID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Event not found"})
		return
	}

	// Delete associated tickets first
	if err := config.DB.Where("event_id = ?", eventID).Delete(&models.Ticket{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to delete associated tickets"})
		return
	}

	// Delete event
	if err := config.DB.Delete(&event).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to delete event"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Event deleted successfully",
		"success":    true,
	})
}
