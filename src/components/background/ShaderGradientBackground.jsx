import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import "./ShaderGradientBackground.css";

/**
 * ShaderGradientBackground.jsx
 * ----------------------------
 * Reusable shader gradient background component
 * Can be used across different pages with optional fade-in support
 */
export default function ShaderGradientBackground({ isVisible = true, className = "" }) {
  return (
    <ShaderGradientCanvas
      className={`shader-gradient-bg ${isVisible ? 'fade-in' : ''} ${className}`}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      pixelDensity={2.5}
      fov={40}
    >
      <ShaderGradient
        animate="on"
        brightness={1.2}
        cAzimuthAngle={170}
        cDistance={5.01}
        cPolarAngle={70}
        cameraZoom={1}
        color1="#00aeff"
        color2="#f5f5f5"
        color3="#e8e8e8"
        envPreset="city"
        grain="off"
        lightType="3d"
        loop="on"
        loopDuration={20}
        positionX={0}
        positionY={0.9}
        positionZ={-0.3}
        range="enabled"
        rangeEnd={20}
        rangeStart={0}
        reflection={0.1}
        rotationX={45}
        rotationY={0}
        rotationZ={0}
        shader="defaults"
        toggleAxis={false}
        type="waterPlane"
        uAmplitude={0.5}
        uDensity={1.5}
        uFrequency={2.0}
        uSpeed={0.1}
        uStrength={3.1}
        uTime={0}
        wireframe={false}
        zoomOut={false}
      />
    </ShaderGradientCanvas>
  );
}

