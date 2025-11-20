import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import "../components/main/main.css";
import "./experience.css";
import { getExperienceById, getExperienceNeighbors } from "./experienceData";

export default function ExperiencePage() {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const experience = useMemo(() => getExperienceById(experienceId), [experienceId]);
  const neighbors = useMemo(() => getExperienceNeighbors(experience.id), [experience.id]);
  const carouselRef = useRef(null);

  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollDirectionRef = useRef(1); // 1 for down, -1 for up
  const idleTimeoutRef = useRef(null);

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
  }, []);

  const resumeAutoScroll = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        setIsAutoScrolling(true);
      }
    }, 1500); // Resume after 1.5 seconds of inactivity
  }, [isHovered]);

  // Auto-scroll animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrame;
    const scroll = () => {
      if (isAutoScrolling && !isHovered && carousel) {
        const maxScroll = carousel.scrollHeight - carousel.clientHeight;
        if (maxScroll > 0) {
          let nextScroll = carousel.scrollTop + 2.5 * scrollDirectionRef.current;
          
          if (nextScroll <= 0) {
            nextScroll = 0;
            scrollDirectionRef.current = 1; // Change direction to down
          } else if (nextScroll >= maxScroll) {
            nextScroll = maxScroll;
            scrollDirectionRef.current = -1; // Change direction to up
          }
          
          carousel.scrollTop = nextScroll;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoScrolling, isHovered, experience.media]);

  // Handle manual scrolling
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      pauseAutoScroll();
      resumeAutoScroll();
    };

    const handleWheel = () => {
      pauseAutoScroll();
      resumeAutoScroll();
    };

    carousel.addEventListener('scroll', handleScroll);
    carousel.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      carousel.removeEventListener('wheel', handleWheel);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [pauseAutoScroll, resumeAutoScroll]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    pauseAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resumeAutoScroll();
  };

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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
              <button
                type="button"
                className="experience-nav-arrow experience-nav-arrow--left"
                onClick={() => handleNavigate("prev")}
                aria-label={`Previous: ${neighbors.previous.title}`}
              >
                ‹
              </button>
              <h1 className="experience-title">{experience.title}</h1>
              <button
                type="button"
                className="experience-nav-arrow experience-nav-arrow--right"
                onClick={() => handleNavigate("next")}
                aria-label={`Next: ${neighbors.next.title}`}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}