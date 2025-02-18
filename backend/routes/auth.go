package routes

import (
	"event-go-backend/controllers"
	"event-go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	auth := r.Group("/api/v1/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
		auth.POST("/logout", controllers.Logout)
	}

	protected := r.Group("/api/v1/protected", middleware.AuthMiddleware(""))
	{
		protected.GET("/dashboard", func(c *gin.Context){
			c.JSON(200, gin.H{
				"message": "Welcome to the protected area!",
			})
		})
	}

	// Only Organizer can create events
	protectedOrganizer := r.Group("api/v1/organizer", middleware.AuthMiddleware("ORGANIZER"))
	{
		protectedOrganizer.POST("/create-event", controllers.CreateEvent)
	}
}
