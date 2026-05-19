package services

import (
	"context"
	"encoding/json"
	"os"
	"strings"

	"google.golang.org/genai"
)

type AIService interface {
	GenerateResumeBullets(role string, skills []string) []string
}

type aiService struct{}

func NewAIService() AIService {
	return &aiService{}
}

func (s *aiService) GenerateResumeBullets(role string, skills []string) []string {
	ctx := context.Background()

	client, err := genai.NewClient(
		ctx,
		&genai.ClientConfig{
			APIKey:  os.Getenv("GEMINI_API_KEY"),
			Backend: genai.BackendGeminiAPI,
		},
	)
	if err != nil {
		return []string{err.Error()}
	}

	model := "gemini-2.5-flash"

	prompt := "Generate EXACTLY 4 ATS-friendly resume bullet points for a " +
		role +
		" skilled in " +
		strings.Join(skills, ", ") +
		`. Return ONLY a raw JSON array of strings.

Example:
[
  "Built scalable frontend systems...",
  "Improved API performance..."
]

No explanation, no markdown block syntax.`

	result, err := client.Models.GenerateContent(
		ctx,
		model,
		genai.Text(prompt),
		nil,
	)
	if err != nil {
		return []string{err.Error()}
	}

	// Clean up markdown block wraps if the LLM includes them (e.g., ```json ... ```)
	responseText := result.Text()
	responseText = strings.TrimPrefix(responseText, "```json")
	responseText = strings.TrimPrefix(responseText, "```")
	responseText = strings.TrimSuffix(responseText, "```")
	responseText = strings.TrimSpace(responseText)

	// Unmarshal the JSON string array back into a Go slice
	var bullets []string
	err = json.Unmarshal([]byte(responseText), &bullets)
	if err != nil {
		// Fallback: if JSON parsing fails, return the raw text as a single element
		return []string{responseText}
	}

	return bullets
}