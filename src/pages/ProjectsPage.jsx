import React, { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import TitleStepper from "../components/main/TitleStepper";
import "../components/main/main.css";
import "./experience.css";
import { getProjectById, getProjectNeighbors } from "./projectsData";

export default function ProjectsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = useMemo(() => getProjectById(projectId), [projectId]);
  const neighbors = useMemo(() => getProjectNeighbors(project.id), [project.id]);
  const carouselRef = useRef(null);
  const scrollDirectionRef = useRef(1); // 1 for down, -1 for up
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrame;
    let lastTime = performance.now();
    const scrollSpeed = 0.015; // pixels per millisecond
    
    const scroll = (currentTime) => {
      if (!carousel || isHovered) {
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
          scrollDirectionRef.current = 1; // Immediately change direction to down
        } else if (nextScroll >= maxScroll) {
          nextScroll = maxScroll;
          scrollDirectionRef.current = -1; // Immediately change direction to up
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
  }, [project.media, isHovered]);

  const handleNavigate = useCallback((direction) => {
    const target = direction === "prev" ? neighbors.previous : neighbors.next;
    navigate(`/projects/${target.id}`);
  }, [navigate, neighbors]);

  const handleExit = useCallback(() => {
    // Check if we came from a specific page section
    const fromPage = location.state?.from;
    if (fromPage === 'projects') {
      // Navigate to main page with projects card active (card index 2)
      navigate('/', { state: { activeCard: 2 } });
    } else {
      navigate('/');
    }
  }, [navigate, location.state]);

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
          <button 
            className="experience-exit-button"
            onClick={handleExit}
            aria-label="Exit to main page"
          >
            ×
          </button>
          <div className="experience-left">
            <div 
              className="experience-carousel"
              ref={carouselRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {project.media.map((item, index) => (
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
                title={project.title}
                onPrev={() => handleNavigate("prev")}
                onNext={() => handleNavigate("next")}
              />
            </div>
            <div className="experience-content">
              {project.about && project.about.length > 0 && (
                <div className="experience-section">
                  <h2 className="experience-section-title">About</h2>
                  <div className="experience-section-content">
                    {project.about.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              {project.learned && project.learned.length > 0 && (
                <div className="experience-section">
                  <h2 className="experience-section-title">What I Learnt</h2>
                  <div className="experience-section-content">
                    <ul className="experience-list">
                      {project.learned.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {project.contributions && project.contributions.length > 0 && (
                <div className="experience-section">
                  <h2 className="experience-section-title">Contributions</h2>
                  <div className="experience-section-content">
                    <ul className="experience-list">
                      {project.contributions.map((item, index) => (
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
