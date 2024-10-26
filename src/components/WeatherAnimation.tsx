import React from 'react';

interface Props {
  condition: string;
}

export const WeatherAnimation: React.FC<Props> = ({ condition }) => {
  const renderRaindrops = () => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="rain"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: Math.random() * 0.4 + 0.2,
        }}
      />
    ));
  };

  const renderSnowflakes = () => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="snow"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          opacity: Math.random() * 0.4 + 0.2,
        }}
      />
    ));
  };

  const renderClouds = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="clouds"
        style={{
          left: `${20 + i * 30}%`,
          top: `${20 + i * 10}%`,
          animationDelay: `${i * 0.5}s`,
          opacity: 0.2,
        }}
      />
    ));
  };

  switch (condition.toLowerCase()) {
    case 'rain':
      return <>{renderRaindrops()}</>;
    case 'snow':
      return <>{renderSnowflakes()}</>;
    case 'clouds':
      return <>{renderClouds()}</>;
    default:
      return null;
  }
};