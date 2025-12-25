package models

import "time"

type Category struct {
	ID        string           `gorm:"primaryKey" json:"id"`
	Name      string           `json:"name"`
	CreatedAt time.Time        `json:"created_at"`
	Templates []ResumeTemplate `gorm:"foreignKey:CategoryID" json:"templates,omitempty"`
}
