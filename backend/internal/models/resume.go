package models

import "time"

type GenerateRequest struct {
	Role   string   `json:"role"`
	Skills []string `json:"skills"`
}

type GenerateResponse struct {
	Bullets []string `json:"bullets"`
}


type Contact struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Linkedin string `json:"linkedin"`
	Github   string `json:"github"`
}

type Skills struct {
	Languages string `json:"languages"`
	Frameworks string `json:"frameworks"`
	Cloud string `json:"cloud"`
	Tools string `json:"tools"`
}

type Experience struct {
	Company string `json:"company"`
	Role string `json:"role"`
	Duration string `json:"duration"`
	Description string `json:"description"`
}

type Project struct {
	Title string `json:"title"`
	Tech string `json:"tech"`
	Description string `json:"description"`
}

type Education struct {
	College string `json:"college"`
	Degree string `json:"degree"`
	Year string `json:"year"`
}

type ResumeContent struct {

	Contact Contact `json:"contact"`
	Summary string `json:"summary"`
	Skills Skills `json:"skills"`
	Experience []Experience `json:"experience"`
	Projects []Project `json:"projects"`
	Education []Education `json:"education"`

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
