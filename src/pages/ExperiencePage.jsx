import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import TitleStepper from "../components/main/TitleStepper";
import "../components/main/main.css";
import "./experience.css";
import { getExperienceById, getExperienceNeighbors } from "./experienceData";

export default function ExperiencePage() {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const experience = useMemo(() => getExperienceById(experienceId), [experienceId]);
  const neighbors = useMemo(() => getExperienceNeighbors(experience.id), [experience.id]);
  const carouselRef = useRef(null);
  const scrollDirectionRef = useRef(1); // 1 for down, -1 for up

  // Auto-scroll animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrame;
    let lastTime = performance.now();
    const scrollSpeed = 0.1; // pixels per millisecond
    
    const scroll = (currentTime) => {
      if (!carousel) {
        animationFrame = requestAnimationFrame(scroll);
        return;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      const maxScroll = carousel.scrollHeight - carousel.clientHeight;
      if (maxScroll > 0) {
        const scrollAmount = scrollSpeed * deltaTime * scrollDirectionRef.current;
        let nextScroll = carousel.scrollTop + scrollAmount;
        
        if (nextScroll <= 0) {
          nextScroll = 0;
          scrollDirectionRef.current = 1; // Change direction to down
        } else if (nextScroll >= maxScroll) {
          nextScroll = maxScroll;
          scrollDirectionRef.current = -1; // Change direction to up
        }
        
        carousel.scrollTop = nextScroll;
      }
      
      animationFrame = requestAnimationFrame(scroll);
    };

    lastTime = performance.now();
    animationFrame = requestAnimationFrame(scroll);
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [experience.media]);

  const handleNavigate = useCallback((direction) => {
    const target = direction === "prev" ? neighbors.previous : neighbors.next;
    navigate(`/experience/${target.id}`);
  }, [navigate, neighbors]);

  return (
    <div className="experience-root">
      <video className="mp-video mp-video--experience" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
      </video>
      <div className="mp-bg-gradient mp-bg-gradient--experience" aria-hidden />

      <Navbar />
      
      <div className="experience-container">
        <div className="experience-box">
          <div className="experience-left">
            <div 
              className="experience-carousel"
              ref={carouselRef}
            >
              {experience.media.map((item, index) => (
                <div key={index} className="experience-carousel-item">
                  <img 
                    src={item.placeholder || item.src} 
                    alt={item.alt}
                    onError={(e) => {
                      e.target.src = item.placeholder || '/media/img1.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="experience-right">
            <div className="experience-header">
              <TitleStepper
                title={experience.title}
                onPrev={() => handleNavigate("prev")}
                onNext={() => handleNavigate("next")}
              />
            </div>
            <div className="experience-content">
              {experience.about && experience.about.length > 0 && (
                <div className="experience-section">
                  <h2 className="experience-section-title">About</h2>
                  <div className="experience-section-content">
                    {experience.about.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              {experience.learned && experience.learned.length > 0 && (
                <div className="experience-section">
                  <h2 className="experience-section-title">What I Learnt</h2>
                  <div className="experience-section-content">
                    <ul className="experience-list">
                      {experience.learned.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {experience.contributions && experience.contributions.length > 0 && (
                <div className="experience-section">
                  <h2 className="experience-section-title">Contributions</h2>
                  <div className="experience-section-content">
                    <ul className="experience-list">
                      {experience.contributions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}