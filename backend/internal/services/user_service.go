package services

import (
	"errors"

	"github.com/nitin-787/resume-generator-backend/internal/dto"
	"github.com/nitin-787/resume-generator-backend/internal/models"
	"github.com/nitin-787/resume-generator-backend/internal/repository"
	"github.com/nitin-787/resume-generator-backend/internal/utils"
)

type AuthService interface {
	Register(req dto.RegisterRequest) error
	Login(req dto.LoginRequest) (dto.LoginResponse, error)
}

type authService struct {
	repo repository.UserRepository
}

func NewAuthService(r repository.UserRepository) AuthService {
	return &authService{repo: r}
}

func (s *authService) Register(req dto.RegisterRequest) error {
	existing, _ := s.repo.FindByEmail(req.Email)
	if existing != nil && existing.ID != 0 {
		return errors.New("email already exists")
	}

	hashed, err := utils.HashPassword(req.Password)
	if err != nil {
		return err
	}

	user := &models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashed,
	}
	return s.repo.Create(user)

}

func (s *authService) Login(req dto.LoginRequest) (dto.LoginResponse, error) {
	user, err := s.repo.FindByEmail(req.Email)
	if err != nil {
		return dto.LoginResponse{}, errors.New("invalid email ")
	}
	if err := utils.CheckPasswordHash(user.Password, req.Password); err != nil {
		return dto.LoginResponse{}, errors.New("invalid email or password")
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return dto.LoginResponse{}, errors.New("failed to generate token")
	}
	return dto.LoginResponse{
			Token: token,
			User: dto.UserResponse{
				ID:    user.ID,
				Name:  user.Name,
				Email: user.Email,
			},
		},
		nil

}
