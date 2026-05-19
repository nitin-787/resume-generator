package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nitin-787/resume-generator-backend/internal/services"
)

type ResumeHandler struct {
	service services.ResumeService
}

func NewResumeHandler(s services.ResumeService) *ResumeHandler {
	return &ResumeHandler{service: s}
}

// CreateResumeHandler handles POST /api/resumes
func (h *ResumeHandler) CreateResume(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var body struct {
		Title      string `json:"title"`
		TemplateID string `json:"template_id"`
		Content    string `json:"content"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resume, err := h.service.CreateResume(userID.(uint), body.Title, body.TemplateID, body.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Resume created successfully",
		"data":    resume,
	})
}

// GetAllResumes handles GET /api/resumes
func (h *ResumeHandler) GetAllResumes(c *gin.Context) {
	userID, _ := c.Get("userID")

	resumes, err := h.service.GetAllUserResumes(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    resumes,
	})
}

func(h * ResumeHandler) UpdateResume(c * gin.Context) {
    userID, _ := c.Get("userID")
    id, err := strconv.Atoi(c.Param("id"))
    
	if err != nil {
        c.JSON(400, gin.H {
            "error": "invalid id",
        }, );
        return;
    }
    
	var body struct {
        Title string `json:"title"`
        Content string `json:"content"`
    }
    
	if err := c.ShouldBindJSON( & body, );
    
	err != nil {
        c.JSON(400, gin.H {
            "error": err.Error(),
        }, );
        return;
    }
    
	err = h.service.UpdateResume(uint(id), userID.(uint), body.Title, body.Content, );
    
	if err != nil {
        c.JSON(500, gin.H {
            "error": err.Error(),
        }, );
        return;
    }

    c.JSON(200, gin.H {
        "success": true,
        "message": "resume updated",
    }, );
}

func (h *ResumeHandler) DeleteResume(c *gin.Context) {
	userID, _ := c.Get("userID")

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid id",
		})
		return
	}

	err = h.service.DeleteResume(uint(id), userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "resume deleted",
	})
}

func (h *ResumeHandler) GetResumeByID(c *gin.Context) {
	userID, _ := c.Get("userID")

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid id",
		})
		return
	}

	resume, err := h.service.GetResumeByID(uint(id), userID.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    resume,
	})
}