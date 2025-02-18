package main

import (
	"event-go-backend/config"
	"event-go-backend/models"
	"event-go-backend/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func main() {
	r := gin.Default()

	validate = validator.New()

	// Use the validate variable to validate some data
	var userData struct {
		Name  string `validate:"required"`
		Email string `validate:"required,email"`
	}
	err := validate.Struct(userData)
	if err != nil {
		log.Println(err)
	}

	config.ConnectDB()
	config.DB.AutoMigrate(&models.Event{}, &models.Ticket{})

	routes.AuthRoutes(r)
	routes.EventRoutes(r)
	routes.TicketRoutes(r)

	r.Run(":8080")
}
