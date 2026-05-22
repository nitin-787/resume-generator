package services

import (
	"encoding/json"
	"errors"

	"github.com/nitin-787/resume-generator-backend/internal/models"
	"github.com/nitin-787/resume-generator-backend/internal/repository"
)

type ResumeService interface {
	CreateResume(userID uint, title string, templateID string, content string) (*models.Resume, error)
	GetAllUserResumes(userID uint) ([]models.Resume, error)
	GetResumeByID(id uint, userID uint) (*models.Resume, error)
	UpdateResume(id uint, userID uint, title string, content string) error
	DeleteResume(id uint, userID uint) error
}

type resumeService struct {
	repo repository.ResumeRepository
}

func NewResumeService(r repository.ResumeRepository) ResumeService {
	return &resumeService{repo: r}
}


func (s *resumeService) CreateResume(userID uint, title string, templateID string, content string) (*models.Resume, error) {
	if title == "" {
		return nil, errors.New("resume title cannot be empty")
	}

	if content == "" {
		defaultContent := models.ResumeContent {
			Contact: models.Contact{},
			Summary: "",
			Skills: models.Skills{},
			Experience: []models.Experience{{}},
			Projects: []models.Project{{}},
			Education: []models.Education{},		
		}

		jsonData, err := json.Marshal(defaultContent)

		if err != nil {
			return nil, err
		}

		content = string(jsonData)
	}



	resume := &models.Resume{
		UserID:     userID,
		Title:      title,
		TemplateID: templateID,
		Content:    content,
	}

	err := s.repo.Create(resume)
	if err != nil {
		return nil, err
	}
	return resume, nil
}

func (s *resumeService) GetAllUserResumes(userID uint) ([]models.Resume, error) {
	return s.repo.GetByUserID(userID)
}

func (s *resumeService) GetResumeByID(id uint, userID uint) (*models.Resume, error) {
	return s.repo.GetByID(id, userID)
}

func (s *resumeService) UpdateResume(id uint, userID uint, title string, content string) error {
	existingResume, err := s.repo.GetByID(id, userID)
	if err != nil {
		return errors.New("resume not found or unauthorized")
	}

	if title != "" {
		existingResume.Title = title
	}
	if content != "" {
		existingResume.Content = content
	}

	return s.repo.Update(existingResume)
}

func (s *resumeService) DeleteResume(id uint, userID uint) error {
	_, err := s.repo.GetByID(id, userID)
	if err != nil {
		return errors.New("resume not found or unauthorized")
	}

	return s.repo.Delete(id, userID)
}