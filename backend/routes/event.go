package routes

import (
	"event-go-backend/controllers"
	"event-go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func EventRoutes(r *gin.Engine) {
	// Routes protected for ORGANIZERS only
	event := r.Group("api/v1/events", middleware.AuthMiddleware("ORGANIZER"))
	{
		event.POST("/create", controllers.CreateEvent)
		event.GET("/", controllers.GetEventsByOrganizer)
		event.GET("/:eventId", controllers.GetEventByID)
	}
}
