package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nitin-787/resume-generator-backend/internal/config"
	"github.com/nitin-787/resume-generator-backend/internal/database"
	"github.com/nitin-787/resume-generator-backend/internal/handlers"
)

func main() {
	config.LoadConfig()
	database.ConnectDatabase()

	r := chi.NewRouter()
	
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
}
