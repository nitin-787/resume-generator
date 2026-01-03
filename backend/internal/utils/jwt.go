package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/nitin-787/resume-generator-backend/internal/config"
)

type JwtClaims struct {
	UserId uint
	jwt.RegisteredClaims
}

func GenerateToken(userId uint) (string, error) {
	secret := []byte(config.AppConfig.JWT_SECRET)
	claims := JwtClaims{
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "resume-saas-api",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	return token.SignedString(secret)
}

func ValidateToken(tokenString string) (*JwtClaims, error) {
	secret := []byte(config.AppConfig.JWT_SECRET)

	token, err := jwt.ParseWithClaims(tokenString, &JwtClaims{}, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*JwtClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("invalid token")
}
