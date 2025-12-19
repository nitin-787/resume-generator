package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nitin-787/resume-generator-backend/internal/handlers"
)


func main() {
	r := chi.NewRouter()

	r.Get("/health", handlers.Health)
	log.Println("Starting Go server on :8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatal(err)
	}
}
