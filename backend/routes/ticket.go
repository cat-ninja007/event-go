package routes

import (
	"event-go-backend/controllers"
	"event-go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func TicketRoutes(r *gin.Engine) {
	// ✅ Restricted routes: Only ORGANIZERS can create, edit, and delete tickets
	ticket := r.Group("/api/v1/tickets", middleware.AuthMiddleware("ORGANIZER"))
	{
		ticket.GET("", controllers.GetTickets)                      // Get all tickets (by eventId)
		ticket.GET("/:ticketId", controllers.GetTicketByID)         // Get a single ticket
		ticket.POST("", controllers.CreateTicket)                   // Create a ticket
		ticket.PUT("/:ticketId", controllers.UpdateTicket)          // Update a ticket
		ticket.DELETE("/:ticketId", controllers.DeleteTicket)       // Delete a ticket
		ticket.PUT("/:ticketId/release", controllers.ReleaseTicket) // Release a ticket (make it available)
		ticket.PUT("/:ticketId/close", controllers.CloseTicket)     // Close a ticket (visible but not buyable)
	}

	// ✅ Public route: Attendees & non-authenticated users can access released tickets
	r.GET("/api/v1/public/tickets", controllers.GetReleasedTickets) // Fetch only released tickets
}
