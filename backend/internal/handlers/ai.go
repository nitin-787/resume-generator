package handlers 

import (
	"encoding/json"
	"net/http"

	"github.com/nitin-787/resume-generator-backend/internal/models"
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
	}

	// Mock AI output
	resp := models.GenerateResponse {
		Bullets: []string{
			"Built scalable frontend components using React",
			"Collaborated with backend teams to integrate APIs",
			"Improved application performance and UX",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}