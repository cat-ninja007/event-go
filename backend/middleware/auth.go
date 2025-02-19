package middleware

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(roleRequired string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get token from header
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
			log.Println("🚨 Missing or invalid token")
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Missing or invalid token"})
			c.Abort()
			return
		}
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		// Parse token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Ensure token is signed with the expected method
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				log.Println("🚨 Unexpected signing method")
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(os.Getenv("SECRET_KEY")), nil
		})

		// Handle invalid token
		if err != nil || !token.Valid {
			log.Println("🚨 Unauthorized access: Invalid token", err)
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		// Extract claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			log.Println("🚨 Invalid token claims")
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token claims"})
			c.Abort()
			return
		}

		// Debugging: Print claims to check values
		log.Println("🔍 Extracted Claims:", claims)

		// Extract role & user ID safely
		role, roleOk := claims["role"].(string)
		userID, userOk := claims["userId"].(float64) // JWT numbers are float64

		if !roleOk || !userOk {
			log.Println("🚨 Invalid role or userId format")
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token structure"})
			c.Abort()
			return
		}

		// Role-based access control
		if roleRequired != "" && role != roleRequired {
			log.Println("🚨 Access denied. Required role:", roleRequired, "but got:", role)
			c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
			c.Abort()
			return
		}

		// Set user ID in context
		c.Set("userId", int(userID)) // Convert float64 to int
		c.Set("role", role)
		c.Next()
	}
}

// package middleware

// import (
// 	"net/http"
// 	"os"
// 	"strings"

// 	"github.com/gin-gonic/gin"
// 	"github.com/golang-jwt/jwt/v5"
// )

// func AuthMiddleware(roleRequired string) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		// Get token from header
// 		tokenString := c.GetHeader("Authorization")
// 		if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
// 			c.JSON(http.StatusUnauthorized, gin.H{"message": "Missing or invalid token"})
// 			c.Abort()
// 			return
// 		}
// 		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

// 		// Parse token
// 		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 			return []byte(os.Getenv("SECRET_KEY")), nil
// 		})

// 		// Handle invalid token
// 		if err != nil || !token.Valid {
// 			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
// 			c.Abort()
// 			return
// 		}

// 		// Extract claims
// 		claims, ok := token.Claims.(jwt.MapClaims)
// 		if !ok {
// 			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token claims"})
// 			c.Abort()
// 			return
// 		}

// 		// Role-based access control
// 		if roleRequired != "" && claims["role"] != roleRequired {
// 			c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
// 			c.Abort()
// 			return
// 		}

// 		// Set user ID in context
// 		c.Set("userId", claims["userId"])
// 		c.Next()
// 	}
// }
