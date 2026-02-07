package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nitin-787/resume-generator-backend/internal/config"
	"github.com/nitin-787/resume-generator-backend/internal/database"
	"github.com/nitin-787/resume-generator-backend/internal/handlers"
	"github.com/nitin-787/resume-generator-backend/internal/middleware" // 1. Import your middleware
	"github.com/nitin-787/resume-generator-backend/internal/repository"
	"github.com/nitin-787/resume-generator-backend/internal/services"
)

func main() {
	// 1. Setup Environment
	config.LoadConfig()
	database.ConnectDatabase()
	database.MigrateDatabase()

	// 2. Dependency Injection
	userRepo := repository.NewUserRepository(database.DB)
	authService := services.NewAuthService(userRepo)
	authHandler := handlers.NewAuthHandler(authService)

	aiService := services.NewAIService()
	aiHandler := handlers.NewAIHandler(aiService)

	// 3. Initialize Gin
	r := gin.Default()

	// 4. CORS Middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// 5. API Routes
	api := r.Group("/api")
	{
		// PUBLIC ROUTES: No token needed
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		// PROTECTED ROUTES: Requires valid JWT
		// Everything inside this group uses the AuthMiddleware
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// Now AI generation is protected so we know WHICH user is using credits
			protected.POST("/ai/generate", aiHandler.GenerateAI)

			// Future resume routes like:
			// protected.POST("/resumes", resumeHandler.Create)
			// protected.GET("/resumes", resumeHandler.GetAll)
		}

		// Health check stays public
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{"status": "UP"})
		})
	}

	// 6. Start Server
	port := config.AppConfig.APPPORT
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 SaaS Backend running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
