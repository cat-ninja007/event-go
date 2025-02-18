package routes

import (
	"event-go-backend/controllers"
	"event-go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func TicketRoutes(r *gin.Engine) {
	ticket := r.Group("/api/v1/tickets", middleware.AuthMiddleware("ORGANIZER")) // ✅ Only ORGANIZERS can create tickets
	{
		ticket.POST("/create", controllers.CreateTicket)
		ticket.GET("/event/:eventId", controllers.GetTicketsByEvent)
		ticket.GET("/event/:eventId/:ticketId", controllers.GetTicketByID)
	}
}
