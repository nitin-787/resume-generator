package models

type GenerateRequest struct {
	Role   string   `json:"role"`
	Skills []string `json:"skills"`
}

type GenerateResponse struct {
	Bullets []string `json:"bullets"`
}