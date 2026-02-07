package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nitin-787/resume-generator-backend/internal/dto"
	"github.com/nitin-787/resume-generator-backend/internal/services"
)

type AuthHandler struct {
	svc services.AuthService
}

func NewAuthHandler(s services.AuthService) *AuthHandler {
	return &AuthHandler{svc: s}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.BaseResponse{Success: false, Message: "Check your input data"})
		return
	}

	if err := h.svc.Register(req); err != nil {
		c.JSON(http.StatusConflict, dto.BaseResponse{Success: false, Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, dto.BaseResponse{Success: true, Message: "Account created successfully"})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.BaseResponse{Success: false, Message: "Invalid request payload"})
		return
	}

	loginData, err := h.svc.Login(req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, dto.BaseResponse{Success: false, Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, dto.BaseResponse{
		Success: true,
		Message: "Login successful",
		Data:    loginData,
	})
}
