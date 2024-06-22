package meta

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
)

type UserProfile struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

//encore:api public method=GET path=/meta/profile
func GetUserProfile(ctx context.Context) (*UserProfile, error) {

	access_token := "e184a8b259fb9f69fdb5d7fcd8cb8840"
	// instagram_business_account_id := "YOUR_INSTAGRAM_BUSINESS_ACCOUNT_ID"
	url := "https://graph.facebook.com/v20.0/me/accounts?access_token=" + access_token

	// make a request to the Instagram Graph API
	// Create a new HTTP GET request
	response, err := http.Get(url)
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
		return nil, err
	}
	defer response.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("Failed to read the response body: %s\n", err)
		return nil, err
	}
	fmt.Printf("Response body: %s\n", body)

	return &UserProfile{ID: "1", Name: "Alice"}, nil
}
