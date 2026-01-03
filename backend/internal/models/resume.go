package models

import "time"

type GenerateRequest struct {
	Role   string   `json:"role"`
	Skills []string `json:"skills"`
}

type GenerateResponse struct {
	Bullets []string `json:"bullets"`
}

type Resume struct {
	ID         uint            `gorm:"primaryKey" json:"id"`
	UserID     uint            `gorm:"index" json:"user_id"`
	TemplateID string          `gorm:"index" json:"template_id"`
	Title      string          `json:"title"`
	Content    string          `gorm:"type:text" json:"content"`
	CreatedAt  time.Time       `json:"created_at"`
	UpdatedAt  time.Time       `json:"updated_at"`
	User       *User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Template   *ResumeTemplate `gorm:"foreignKey:TemplateID" json:"template,omitempty"`
}
