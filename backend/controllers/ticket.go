package controllers

import (
	"event-go-backend/config"
	"event-go-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Ticket Request Body
// Create Ticket Request Body
type CreateTicketInput struct {
	EventID       uint    `json:"eventId" binding:"required"`
	Name          string  `json:"name" binding:"required"`
	Price         float64 `json:"price" binding:"required"`
	AvailableSeat int     `json:"availableSeat" binding:"required"`
	IsReleased    bool    `json:"isReleased"`
	IsClosed      bool    `json:"isClosed"`
}

// CreateTicket handles ticket creation
func CreateTicket(c *gin.Context) {
	var input CreateTicketInput

	// Parse input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Check if event exists
	var event models.Event
	if err := config.DB.First(&event, input.EventID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Event not found"})
		return
	}

	// Create new ticket
	ticket := models.Ticket{
		EventID:       input.EventID,
		Name:          input.Name,
		Price:         input.Price,
		AvailableSeat: input.AvailableSeat,
		IsReleased:    input.IsReleased,
		IsClosed:      input.IsClosed,
	}

	// Save ticket to database
	if err := config.DB.Create(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create ticket"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Ticket created successfully",
		"success":    true,
		"data":       ticket,
	})
}
