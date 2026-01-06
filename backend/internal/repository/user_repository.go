package repository

import (
	"github.com/nitin-787/resume-generator-backend/internal/models"
	"gorm.io/gorm"
)

// Interface
type UserRepository interface {
	Create(user *models.User) error
	FindByEmail(email string) (*models.User, error)
}

// Concrete implementation
type userRepository struct {
	db *gorm.DB
}

// Constructor - return pointer
func NewUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{db: db}
}

// Create user
func (r *userRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

// Find user by email
func (r *userRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	return &user, err
}
