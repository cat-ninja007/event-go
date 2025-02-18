package routes

import (
	"event-go-backend/controllers"
	"event-go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func TicketRoutes(r *gin.Engine) {
	ticket := r.Group("/api/v1/tickets", middleware.AuthMiddleware("ORGANIZER")) // ✅ Only ORGANIZERS can create tickets
	{
		ticket.GET("", controllers.GetTickets)                      // Get tickets for an event (expects eventId in form-data)
		ticket.GET("/:ticketId", controllers.GetTicketByID)         // Get single ticket
		ticket.POST("", controllers.CreateTicket)                   // Create a ticket
		ticket.PUT("/:ticketId", controllers.UpdateTicket)          // Edit a ticket
		ticket.DELETE("/:ticketId", controllers.DeleteTicket)       // Delete a ticket
		ticket.PUT("/:ticketId/release", controllers.ReleaseTicket) // Release a ticket (make it available)
		ticket.PUT("/:ticketId/close", controllers.CloseTicket)     // Close a ticket (user can see but not buy)
	}
}
