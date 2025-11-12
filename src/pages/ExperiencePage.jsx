import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import "../components/main/main.css";
import "./experience.css";
import { getExperienceById, getExperienceNeighbors } from "./experienceData";

const CANVAS_WIDTH = 1520;
const CANVAS_HEIGHT = 800;
const NAV_HEIGHT = 56;

function calculateCanvasMetrics() {
  if (typeof window === "undefined") {
    return { scale: 1, left: 0, top: 0 };
  }
  const { innerWidth, innerHeight } = window;
  const scaleX = innerWidth / CANVAS_WIDTH;
  const availableHeight = Math.max(innerHeight - NAV_HEIGHT, 1);
  const scaleY = availableHeight / CANVAS_HEIGHT;
  const scale = Math.min(scaleX, scaleY, 1);
  const scaledWidth = CANVAS_WIDTH * scale;
  const scaledHeight = CANVAS_HEIGHT * scale;
  return {
    scale,
    left: (innerWidth - scaledWidth) / 2,
    top: NAV_HEIGHT + (availableHeight - scaledHeight) / 2,
  };
}

export default function ExperiencePage() {
  const { experienceId } = useParams();
  const navigate = useNavigate();

  const experience = useMemo(
    () => getExperienceById(experienceId),
    [experienceId]
  );

  const neighbors = useMemo(
    () => getExperienceNeighbors(experience.id),
    [experience.id]
  );

  const [canvasMetrics, setCanvasMetrics] = useState(
    () => calculateCanvasMetrics()
  );

  useLayoutEffect(() => {
    const updateScale = () => {
      setCanvasMetrics(calculateCanvasMetrics());
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
    };
  }, []);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = prevBodyOverflow || "";
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.documentElement.style.overscrollBehavior = prevOverscroll || "";
    };
  }, []);

  const { scale, left, top } = canvasMetrics;

  const handleClose = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  const handleNavigate = useCallback(
    (direction) => {
      const target =
        direction === "prev" ? neighbors.previous : neighbors.next;
      navigate(`/experience/${target.id}`);
    },
    [navigate, neighbors.next, neighbors.previous]
  );

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleNavigate("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNavigate("next");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose, handleNavigate]);

  return (
    <div className="experience-root" role="presentation" onClick={handleClose}>
      <video className="mp-video mp-video--experience" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
      </video>
      <div className="mp-bg-gradient mp-bg-gradient--experience" aria-hidden />

      <Navbar />
      <div className="experience-shell">
        <div
          className="experience-canvas"
          style={{
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            transform: `scale(${scale})`,
            top: `${top}px`,
            left: `${left}px`,
          }}
          role="presentation"
          onClick={(event) => event.stopPropagation()}
        >
          <article
            className="experience-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-title"
          >
            <section className="experience-column experience-column--media">
              <MediaRail media={experience.media} />
            </section>

            <section className="experience-column experience-column--content">
              <header className="experience-header">
                <div className="experience-actions">
                  <button
                    type="button"
                    className="experience-arrow experience-arrow--left"
                    aria-label={`Previous: ${neighbors.previous.title}`}
                    onClick={() => handleNavigate("prev")}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="experience-close"
                    aria-label="Close experience overlay"
                    onClick={handleClose}
                  >
                    ✕
                  </button>
                  <button
                    type="button"
                    className="experience-arrow experience-arrow--right"
                    aria-label={`Next: ${neighbors.next.title}`}
                    onClick={() => handleNavigate("next")}
                  >
                    ›
                  </button>
                </div>
                <div className="experience-title-block">
                  <p className="experience-eyebrow">{experience.headline}</p>
                  <h1 id="experience-title" className="experience-title">
                    {experience.title}
                  </h1>
                  {experience.year && (
                    <p className="experience-subtitle">{experience.year}</p>
                  )}
                </div>
              </header>

              <ExperienceDetails experience={experience} />
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}

function ExperienceDetails({ experience }) {
  return (
    <section className="experience-details" aria-live="polite">
      <div className="experience-section">
        <h2>About</h2>
        {experience.about.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="experience-section">
        <h2>What I Learned</h2>
        <ul>
          {experience.learned.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="experience-section">
        <h2>Contributions</h2>
        <ul>
          {experience.contributions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MediaRail({ media }) {
  const railRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const directionRef = useRef(1);
  const idleTimeoutRef = useRef(null);
  const observerRef = useRef(null);

  const scheduleResume = useCallback(() => {
    window.clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = window.setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  }, []);

  const pauseAutoScroll = useCallback(
    (shouldScheduleResume = true) => {
      if (isAutoScrolling) {
        setIsAutoScrolling(false);
      }
      if (shouldScheduleResume) {
        scheduleResume();
      }
    },
    [isAutoScrolling, scheduleResume]
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const handleWheel = () => pauseAutoScroll(true);
    const handleTouchStart = () => pauseAutoScroll(true);
    const handleTouchMove = () => pauseAutoScroll(true);
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        pauseAutoScroll(true);
      }
    };

    rail.addEventListener("wheel", handleWheel);
    rail.addEventListener("touchstart", handleTouchStart, { passive: true });
    rail.addEventListener("touchmove", handleTouchMove, { passive: true });
    rail.addEventListener("keydown", handleKeyDown);

    return () => {
      rail.removeEventListener("wheel", handleWheel);
      rail.removeEventListener("touchstart", handleTouchStart);
      rail.removeEventListener("touchmove", handleTouchMove);
      rail.removeEventListener("keydown", handleKeyDown);
    };
  }, [pauseAutoScroll]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animationFrame;
    const step = () => {
      if (isAutoScrolling && rail) {
        const maxScroll = rail.scrollHeight - rail.clientHeight;
        if (maxScroll > 0) {
          let next = rail.scrollTop + 0.6 * directionRef.current;
          if (next <= 0) {
            next = 0;
            directionRef.current = 1;
            if (isAutoScrolling) {
              setIsAutoScrolling(false);
              scheduleResume();
            }
          } else if (next >= maxScroll) {
            next = maxScroll;
            directionRef.current = -1;
            if (isAutoScrolling) {
              setIsAutoScrolling(false);
              scheduleResume();
            }
          }
          rail.scrollTop = next;
        }
      }
      animationFrame = window.requestAnimationFrame(step);
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isAutoScrolling, scheduleResume]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector("img[data-src]");
            if (img && img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: rail,
        rootMargin: "100px 0px",
        threshold: 0.1,
      }
    );

    const tiles = rail.querySelectorAll(".experience-media-tile");
    tiles.forEach((tile) => observerRef.current?.observe(tile));

    return () => observerRef.current?.disconnect();
  }, [media]);

  const handleMouseEnter = () => pauseAutoScroll(false);
  const handleMouseLeave = () => scheduleResume();

  const focusTile = useCallback((index) => {
    const rail = railRef.current;
    if (!rail) return;
    const tiles = rail.querySelectorAll(".experience-media-tile");
    if (tiles.length === 0) return;
    const nextIndex = Math.max(0, Math.min(index, tiles.length - 1));
    tiles[nextIndex]?.focus();
  }, []);

  return (
    <aside className="experience-media">
      <div
        ref={railRef}
        className="experience-media-rail"
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {media.map((item, index) => (
          <MediaTile
            key={`${item.alt}-${index}`}
            media={item}
            index={index}
            onFocusRequest={focusTile}
          />
        ))}
      </div>
    </aside>
  );
}

function MediaTile({ media, index, onFocusRequest }) {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onFocusRequest(index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      onFocusRequest(index - 1);
    }
  };

  return (
    <figure
      className="experience-media-tile"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="experience-media-frame">
        <img
          src={media.placeholder}
          data-src={media.src}
          alt={media.alt}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = media.placeholder;
          }}
        />
      </div>
      {media.caption && (
        <figcaption className="experience-media-caption">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}