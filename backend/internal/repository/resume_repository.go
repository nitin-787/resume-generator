package repository

import (
	"github.com/nitin-787/resume-generator-backend/internal/models"
	"gorm.io/gorm"
)

type ResumeRepository interface {
	Create(resume *models.Resume) error
	GetByUserID(userID uint) ([]models.Resume, error)
	GetByID(id uint, userID uint) (*models.Resume, error)
	Update(resume *models.Resume) error
	Delete(id uint, userID uint) error
}

type resumeRepository struct {
	db *gorm.DB
}

func NewResumeRepository(db *gorm.DB) ResumeRepository {
	return &resumeRepository{db: db}
}

func (r *resumeRepository) Create(resume *models.Resume) error {
	return r.db.Create(resume).Error
}

func (r *resumeRepository) GetByUserID(userID uint) ([]models.Resume, error) {
	var resumes []models.Resume
	err := r.db.Where("user_id = ?", userID).Find(&resumes).Error
	return resumes, err
}

func (r *resumeRepository) GetByID(id uint, userID uint) (*models.Resume, error) {
	var resume models.Resume
	err := r.db.Where("id = ? AND user_id = ?", id, userID).First(&resume).Error
	if err != nil {
		return nil, err
	}
	return &resume, nil
}

func (r *resumeRepository) Update(resume *models.Resume) error {
	return r.db.Save(resume).Error
}

func (r *resumeRepository) Delete(id uint, userID uint) error {
	return r.db.Where("id = ? AND user_id = ?", id, userID).Delete(&models.Resume{}).Error
}