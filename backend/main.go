package main

import (
	"event-go-backend/config"
	"event-go-backend/routes"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func main() {
	r := gin.Default()

	// Set trusted proxies
	// if err := r.SetTrustedProxies(nil); err != nil {
	// 	log.Fatal("Failed to set trusted proxies:", err)
	// }
	validate = validator.New()

	config.ConnectDB()

	routes.AuthRoutes(r)

	r.Run(":8080")
}
