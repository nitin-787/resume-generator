package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nitin-787/resume-generator-backend/internal/models"
	"github.com/nitin-787/resume-generator-backend/internal/services" // NOTE: service folder, not services
)

// GenerateAI handles AI resume bullet generation
func GenerateAI(c *gin.Context) {
	var req models.GenerateRequest

	// Bind JSON from request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid JSON"})
		return
	}

	// Call service function
	bullets := services.GenerateResumeBullets(req.Role, req.Skills)

	// Prepare response
	resp := models.GenerateResponse{
		Bullets: bullets,
	}

	// Send JSON response
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "AI bullets generated successfully",
		"data":    resp,
	})
}
