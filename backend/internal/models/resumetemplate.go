package models

import "time"

type ResumeTemplate struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	ThumbnailURL string    `json:"thumbnail_url"`
	CategoryID   string    `gorm:"index" json:"category_id"`
	Category     *Category `json:"category,omitempty"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Resumes      []Resume  `gorm:"foreignKey:TemplateID" json:"resumes,omitempty"`
}
