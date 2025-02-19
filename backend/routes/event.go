package routes

import (
	"event-go-backend/controllers"
	"event-go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func EventRoutes(r *gin.Engine) {
	// Public route for fetching events for homepage
	r.GET("api/v1/events/datatable", controllers.GetAllEventsDatatable)
	r.GET("api/v1/events/:eventId", controllers.GetEventByID)

	// Routes protected for ORGANIZERS only
	event := r.Group("api/v1/events", middleware.AuthMiddleware("ORGANIZER"))
	{
		event.GET("", controllers.GetAllEvents) // Get all events (for organizer)
		// event.GET("/:eventId", controllers.GetEventByID)   // Get single event
		event.POST("", controllers.CreateEvent)            // Create event
		event.PUT("/:eventId", controllers.UpdateEvent)    // Update event
		event.DELETE("/:eventId", controllers.DeleteEvent) // Delete event and associated tickets
	}
}
