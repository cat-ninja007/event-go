package controllers

import (
	"event-go-backend/config"
	"event-go-backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Ticket Request Body
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

	// Check if a ticket with the same name, price, and available seat already exists
	var existingTicket models.Ticket
	if err := config.DB.Where("event_id = ? AND name = ? AND price = ? AND available_seat = ?", input.EventID, input.Name, input.Price, input.AvailableSeat).First(&existingTicket).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"message": "A ticket with the same name, price, and available seat already exists"})
		return
	}

	// Default values for IsReleased and IsClosed if not provided
	isReleased := false
	isClosed := false
	if input.IsReleased {
		isReleased = input.IsReleased
	}
	if input.IsClosed {
		isClosed = input.IsClosed
	}

	// Create new ticket
	ticket := models.Ticket{
		EventID:       input.EventID,
		Name:          input.Name,
		Price:         input.Price,
		AvailableSeat: input.AvailableSeat,
		IsReleased:    isReleased,
		IsClosed:      isClosed,
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

// GetTickets retrieves tickets for a specific event
func GetTickets(c *gin.Context) {
	// Get eventId from query parameters
	eventIDStr := c.Query("eventId")         // Use Query() for URL parameters, not PostForm()
	eventID, err := strconv.Atoi(eventIDStr) // Convert to integer
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid eventId. Must be a number"})
		return
	}

	// Check if event exists
	var event models.Event
	if err := config.DB.First(&event, eventID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "The event doesn't exist"})
		return
	}

	var tickets []models.Ticket
	if err := config.DB.Where("event_id = ?", eventID).Find(&tickets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve tickets"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Tickets retrieved successfully",
		"success":    true,
		"data":       tickets,
	})
}

// GetTicketByID retrieves a single ticket by ID
func GetTicketByID(c *gin.Context) {
	ticketID := c.Param("ticketId")

	// Validate ticketId as an integer before querying
	var ticket models.Ticket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Ticket not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Ticket retrieved successfully",
		"success":    true,
		"data":       ticket,
	})
}

// DeleteTicket deletes a ticket by ID
func DeleteTicket(c *gin.Context) {
	ticketID := c.Param("ticketId")

	// Validate ticket exists
	var ticket models.Ticket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Ticket not found"})
		return
	}

	// Delete ticket
	if err := config.DB.Delete(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to delete ticket"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Ticket deleted successfully",
		"success":    true,
	})
}

// UpdateTicket updates an existing ticket by ID
func UpdateTicket(c *gin.Context) {
	ticketID := c.Param("ticketId")

	var ticket models.Ticket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Ticket not found"})
		return
	}

	var input CreateTicketInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	config.DB.Model(&ticket).Updates(input)
	c.JSON(http.StatusOK, gin.H{"statusCode": 200, "message": "Ticket updated successfully", "success": true, "data": ticket})
}

// ReleaseTicket marks a ticket as released
func ReleaseTicket(c *gin.Context) {
	ticketID := c.Param("ticketId")

	var ticket models.Ticket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Ticket not found"})
		return
	}

	// Update ticket status
	ticket.IsReleased = true
	if err := config.DB.Save(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update ticket status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Ticket released successfully",
		"success":    true,
		"data":       ticket,
	})
}

// CloseTicket marks a ticket as closed
func CloseTicket(c *gin.Context) {
	ticketID := c.Param("ticketId")

	var ticket models.Ticket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Ticket not found"})
		return
	}

	ticket.IsClosed = true
	config.DB.Save(&ticket)

	c.JSON(http.StatusOK, gin.H{"statusCode": 200, "message": "Ticket closed successfully", "success": true, "data": ticket})
}

func GetReleasedTickets(c *gin.Context) {
	var tickets []models.Ticket
	eventId := c.Query("eventId") // Get eventId from query params

	// Check if eventId is provided
	if eventId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Event ID is required"})
		return
	}

	// Fetch only released tickets
	if err := config.DB.Where("event_id = ? AND is_released = ?", eventId, true).Find(&tickets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve released tickets"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Released tickets retrieved successfully",
		"success":    true,
		"data":       tickets,
	})
}
