package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nitin-787/resume-generator-backend/internal/config"
	"github.com/nitin-787/resume-generator-backend/internal/database"
	"github.com/nitin-787/resume-generator-backend/internal/handlers"
	"github.com/nitin-787/resume-generator-backend/internal/utils"
)

func main() {
	config.LoadConfig()
	database.ConnectDatabase()

	r := chi.NewRouter()
	r.Use(utils.CORSMiddleware)
	
	// for debugging
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("root ok"))
	})

	r.Get("/health", handlers.Health)
	r.Post("/ai/generate", handlers.GenerateAI)

	log.Println("Server running on :8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatal(err)
	}

	r.Use(func(next http.Handler) http.Handler {
	  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		if r.Method == "OPTIONS" {
		  w.WriteHeader(http.StatusOK)
		  return
		}
		next.ServeHTTP(w, r)
	  })
	})
}

