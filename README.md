# weatherApp
A responsive weather dashboard that displays the current weather and upcoming forecast for any city. The application uses JavaScript, jQuery, and a serverless backend built with AWS Lambda and API Gateway (HTTP API) to securely retrieve weather data from an external weather API and dynamically render it on the frontend.

## Live Demo: -
https://your-demo-link.com

## Features
### Current Weather
- Displays the current temperature and weather condition
- Shows the local date and time for the selected location
- Automatically detects the user's location using the Browser Geolocation API

### Weather Forecast
- Displays upcoming forecast for the next 2 days
- Dynamically renders weather icons and temperatures
- Forecast updates when searching for a different city

### City Search
- Search weather for any city
- Press Enter or click the search button

### Temperature Toggle
- Switch between Fahrenheit and Celsius
- Weather data updates instantly without another API request

### Loading State
- Displays a loading message while retrieving weather data from the backend

### Responsive Design
- Mobile-friendly layout
- Built using Flexbox and CSS Grid

## Tech Stack
### Frontend
- HTML5
- CSS3
- JavaScript
- jQuery

### Backend
- AWS Lambda
- Amazon API Gateway (HTTP API)

### External API
- Weather API service for real-time weather data

### Architecture

- The application uses a serverless architecture to protect the weather API key and handle API requests securely.

Frontend (HTML / CSS / JavaScript)
        ➡️
API Gateway (HTTP API)
        ➡️
AWS Lambda
        ➡️
Weather API

- The frontend sends a request to an API Gateway HTTP endpoint, which triggers an AWS Lambda function.
The Lambda function retrieves weather data from the external weather API and returns the response to the frontend.

Project Structure
weather-app
│
├── index.html
├── css
│   └── styles.css
├── script
│   └── app.js
├── icon
│   └── weather icons
└── README.md

## Key Functionality
### Geolocation Weather
Automatically detects the user’s location and displays the local weather.

### Dynamic Weather Rendering
- Weather data is fetched from the backend and dynamically rendered using JavaScript and jQuery.

### Weather Icon Mapping
- Weather condition codes from the API are mapped to custom weather icons for improved visual representation.

## Future Improvements
- Add 7-day forecast
- Display humidity, wind speed, and "feels like" temperature
- Add hourly weather forecast
- Save last searched city using localStorage
- Add improved weather animations

## What I Learned
- Integrating external APIs with JavaScript
- Creating serverless APIs using AWS Lambda
- Routing requests through API Gateway HTTP APIs
- Working with browser Geolocation API
- Dynamically rendering UI components using jQuery
- Building responsive layouts with Flexbox and CSS Grid

### Screenshots:
#### Desktop view:
<img width="1000" height="600" alt="Screenshot 2026-03-07 015211" src="https://github.com/user-attachments/assets/51a54b92-78db-46f6-b7a2-63cdcd34067d" />

#### Mobile view:
<img width="200" height="450" alt="Screenshot 2026-03-07 010426" src="https://github.com/user-attachments/assets/a936c816-11c8-4651-826e-731dd6245a64" />

#### Tablet view:
<img width="600" height="450" alt="Screenshot 2026-03-07 012011" src="https://github.com/user-attachments/assets/5ee05b11-92b7-4597-9fd7-a19c168f7bd7" />

## Author

### Saurav Singh

GitHub
https://github.com/SideWays143
