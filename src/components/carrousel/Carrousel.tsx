"use client";

import { useState } from "react";
import "./carrousel.css";

const Carousel = () => {
  const slides = [
    { id: 1, src: "/images/genomas.png" },
    { id: 2, src: "https://via.placeholder.com/800x400?text=Slide+2" },
    { id: 3, src: "https://via.placeholder.com/800x400?text=Slide+3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      {/* Slides */}
      <div className="carousel__slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="carousel__slide"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img
              src={slide.src}
              alt={`Slide ${slide.id}`}
              className="carousel__image"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="carousel__button carousel__button--prev"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="carousel__button carousel__button--next"
      >
        &gt;
      </button>

      {/* Dots */}
      <div className="carousel__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`carousel__dot ${
              currentIndex === index ? "carousel__dot--active" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
