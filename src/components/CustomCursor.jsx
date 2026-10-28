"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const followerRef = useRef(null);
  const ringRef = useRef(null);
  
  // Track mouse coordinates
  const mouseCoords = useRef({ x: 0, y: 0 });
  const followerCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobileDevice(isTouch);
    if (isTouch) return;

    setIsHidden(false);

    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Track hovered elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      // Check if hovering interactive elements
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".about-stat-card") || 
        target.closest(".about-ai-panel") || 
        target.closest(".about-tag") ||
        target.closest(".hero-media-wrapper") ||
        target.classList.contains("clickable") ||
        target.style.cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Lerp loop
    let animationFrameId = null;
    const render = () => {
      // Follower follows immediately
      followerCoords.current.x = mouseCoords.current.x;
      followerCoords.current.y = mouseCoords.current.y;
      
      // Ring follows with easing (water-like lag)
      const ease = 0.14; // Lerp factor
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerCoords.current.x}px, ${followerCoords.current.y}px, 0)`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isMobileDevice) return null;

  return (
    <>
      <style jsx global>{`
        /* Hide native cursor for interactive experience */
        body {
          cursor: none !important;
        }
        a, button, [role="button"], input, select, textarea {
          cursor: none !important;
        }
        
        @keyframes gradientRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .custom-cursor-follower {
          position: fixed;
          top: -6px;
          left: -6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #7c3aed;
          pointer-events: none;
          z-index: 99999;
          transform: translate3d(0, 0, 0);
          transition: width 0.25s, height 0.25s, background-color 0.25s;
        }
        
        .custom-cursor-ring {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #f97316, #2ab7a9, #614cff);
          background-size: 300% 300%;
          animation: gradientRotate 5s ease infinite;
          pointer-events: none;
          z-index: 99998;
          opacity: 0.58;
          transform: translate3d(0, 0, 0);
          transition: 
            width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            top 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            left 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            border-radius 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s;
          box-shadow: 0 0 24px rgba(124, 58, 237, 0.25);
        }

        /* Hovering interactive elements: turns into diamond multicolor */
        .custom-cursor-ring.hovered {
          top: -28px;
          left: -28px;
          width: 56px;
          height: 56px;
          border-radius: 0%;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          opacity: 0.95;
          box-shadow: 0 0 36px rgba(249, 115, 22, 0.58);
        }
        
        .custom-cursor-follower.hovered {
          width: 0px;
          height: 0px;
          opacity: 0;
        }
        
        .custom-cursor-hidden {
          opacity: 0 !important;
        }
      `}</style>
      <div 
        ref={followerRef} 
        className={`custom-cursor-follower ${isHovered ? "hovered" : ""} ${isHidden ? "custom-cursor-hidden" : ""}`} 
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""} ${isHidden ? "custom-cursor-hidden" : ""}`} 
      />
    </>
  );
}
