package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/nitin-787/resume-generator-backend/internal/models"
	"github.com/nitin-787/resume-generator-backend/internal/services"
)

func GenerateAI(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.GenerateRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	bullets := services.GenerateResumeBullets(req.Role, req.Skills)

	resp := models.GenerateResponse{
		Bullets: bullets,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
