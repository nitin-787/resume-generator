package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Name      string    `gorm:"size:100; not null"`
	Email     string    `gorm:"size:100; unique; not null" json:"email"`
	Password  string    `gorm:"size:100; not null"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Resumes   []Resume  `gorm:"foreignKey:UserID" json:"resumes,omitempty"`
}
