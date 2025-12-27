package database

import (
	"log"
	"time"

	"github.com/nitin-787/resume-generator-backend/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	cfg := config.AppConfig

	db, err := gorm.Open(postgres.Open(cfg.DATABASE_URL), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get sql DB:", err)
	}

	sqlDB.SetMaxIdleConns(5)
	sqlDB.SetMaxOpenConns(10)
	sqlDB.SetConnMaxLifetime(30 * time.Minute)

	DB = db
	log.Println(" Connected to NeonDB successfully")
}
