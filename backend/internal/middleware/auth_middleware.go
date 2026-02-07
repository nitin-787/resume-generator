package middleware

import (
	"net/http"

	"strings"

	"github.com/gin-gonic/gin"
	"github.com/nitin-787/resume-generator-backend/internal/dto"
	"github.com/nitin-787/resume-generator-backend/internal/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, dto.BaseResponse{
				Success: false,
				Message: "Authorization header is required",
			})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")

		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, dto.BaseResponse{
				Success: false,
				Message: "Authorization format must be Bearer {token}",
			})
			c.Abort()
			return
		}

		claims, err := utils.ValidateToken(parts[1])

		if err != nil {
			c.JSON(http.StatusUnauthorized, dto.BaseResponse{
				Success: false,
				Message: "Invalid or expired token",
			})
			c.Abort()
			return
		}
		c.Set("userID", claims.UserId)
		c.Next()
	}
}
