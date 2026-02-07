package services

type AIService interface {
	GenerateResumeBullets(role string, skills []string) []string
}

type aiService struct{}

func NewAIService() AIService {
	return &aiService{}
}

func (s *aiService) GenerateResumeBullets(role string, skills []string) []string {
	// TEMP mock (AI later)
	return []string{
		"Built scalable frontend components using React",
		"Collaborated with backend teams to integrate APIs",
		"Improved application performance and UX",
	}
}
