package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	APPENV       string
	APPPORT      string
	DATABASE_URL string
}

var AppConfig Config

func LoadConfig() {
	err := godotenv.Load()

	if err != nil {
		log.Println(".env not found, using system env vars")
	}

	AppConfig = Config{
		APPENV:       os.Getenv("APPENV"),
		APPPORT:      os.Getenv("APPPORT"),
		DATABASE_URL: os.Getenv("DATABASE_URL"),
	}

	if AppConfig.DATABASE_URL == "" {
		log.Fatal(" DATABASE_URL is required")
	}
}
