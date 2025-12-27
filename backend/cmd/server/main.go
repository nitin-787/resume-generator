package main

import (
	"log"

	"github.com/nitin-787/resume-generator-backend/internal/config"
	"github.com/nitin-787/resume-generator-backend/internal/database"
)

func main() {

	config.LoadConfig()
	database.ConnectDatabase()
	database.MigrateDatabase()

	log.Println("NeonDB migration completed successfully")
}
