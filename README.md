# Weather Monitoring System

A real-time weather monitoring application for major Indian metros. This system fetches and displays weather data at regular intervals, provides daily weather summaries, and issues alerts based on temperature thresholds.

## Features

- **Real-time Weather Updates**: Fetches and displays current weather for major Indian cities.
- **Daily Summaries**: Calculates and displays daily weather summaries based on collected data.
- **Alert System**: Issues alerts for high and low temperatures as per user-configured thresholds.
- **Graphical Visualizations**: Presents weather data trends using charts.
- **Responsive Layout**: Optimized for various screen sizes with animated, user-friendly design.

## Technologies Used

- **React**: For building the user interface.
- **Lucide React Icons**: For iconography.
- **Tailwind CSS**: For styling and layout.
- **Custom Store (useWeatherStore)**: Manages weather data and alert configurations.

## Components

- **App.tsx**: Main app component that fetches, updates, and manages weather data and UI.
- **WeatherCard**: Displays the latest weather data for each city.
- **WeatherChart**: Plots daily summaries of weather data over time.
- **AlertPanel**: Shows alerts when temperature thresholds are exceeded.

## Key Functions

- **fetchWeatherData**: Fetches the latest weather data from the API for each city.
- **calculateDailySummary**: Aggregates weather data into daily summaries.
- **checkAlerts**: Compares data against alert configurations and triggers alerts if thresholds are crossed.

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankit6868/Assignt1-weatherapp.git
   cd Assignt1-weatherapp
1. Clone the repository:
   ```bash
   npm i
1. Clone the repository:
   ```bash
   npm start
