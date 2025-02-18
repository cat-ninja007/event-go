package controllers

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"event-go-backend/config"
	"event-go-backend/models"
)

type RegisterInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
	Role     string `json:"role" binding:"required"`
}

type RegisterResponse struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Success    bool   `json:"success"`
	Data       struct {
		Email     string     `json:"email"`
		CreatedAt time.Time  `json:"createdAt"`
		UpdatedAt time.Time  `json:"updatedAt"`
		DeletedAt *time.Time `json:"deletedAt"`
	}
}

func Register(c *gin.Context) {

	// Validate JSON request body
	var input RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Validate Role before saving
	if input.Role != "ORGANIZER" && input.Role != "ATTENDEE" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid role. Allowed roles: ORGANIZER, ATTENDEE"})
		return
	}

	// Hashing Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password"})
		return
	}

	// Create New Instance
	// Create user record
	user := models.User{
		Name:      input.Name,
		Email:     input.Email,
		Password:  string(hashedPassword),
		Role:      models.Role(input.Role),
		CreatedAt: time.Now().Local().UTC(),
		UpdatedAt: time.Now().Local().UTC(),
		DeletedAt: nil, // Explicitly set deletedAt as null
	}

	// Save to DB
	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusConflict, gin.H{"message": "Email already exists"})
		return
	}

	// Return response
	response := RegisterResponse{
		StatusCode: 200,
		Message:    "User created successfully",
		Success:    true,
	}
	response.Data.Email = user.Email
	response.Data.CreatedAt = user.CreatedAt
	response.Data.UpdatedAt = user.UpdatedAt
	response.Data.DeletedAt = user.DeletedAt

	// Send structured response
	c.JSON(http.StatusOK, response)
}

type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var user models.User
	if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"statusCode": 404,
			"message":    "User not found",
			"success":    false,
		})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"statusCode": 401,
			"message":    "Invalid credentials",
			"success":    false,
		})
		return
	}

	accessToken := generateToken(user)

	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Login successful",
		"success":    true,
		"data": gin.H{
			"accessToken": accessToken,
			"tokenType":   "Bearer",
		},
	})
}

func generateToken(user models.User) string {
	secret := os.Getenv("SECRET_KEY")
	if secret == "" {
		log.Fatal("SECRET_KEY is not set in environment variables")
	}

	// Token expiration
	tokenExpiration := time.Hour * 1
	if os.Getenv("TOKEN_EXPIRY") != "" {
		parsed, err := time.ParseDuration(os.Getenv("TOKEN_EXPIRY"))
		if err == nil {
			tokenExpiration = parsed
		}
	}

	claims := jwt.MapClaims{
		"sub":    user.Email,
		"role":   user.Role,
		"exp":    time.Now().Add(tokenExpiration).Unix(),
		"iat":    time.Now().Unix(),
		"jti":    uuid.NewString(),
		"userId": user.ID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte(secret))

	return tokenString
}

func Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"statusCode": 200,
		"message":    "Logout successful",
		"success":    true,
		"data":       true,
	})
}
