"use client";

import React, { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
  fullscreen?: boolean;
}

export default function Loader({ onComplete, fullscreen = true }: LoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Initializing platform...",
    "Connecting to networks...",
    "Loading secure modules...",
    "Ready to empower..."
  ];

  const onCompleteRef = React.useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Cycle through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);

    // Call onComplete after the 3.5s bar animation completes
    const completionTimeout = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completionTimeout);
    };
  }, [steps.length]);

  return (
    <div
      className={`${
        fullscreen ? "fixed inset-0 z-50" : "relative w-full h-full"
      } flex flex-col items-center justify-center bg-white/80 backdrop-blur-md overflow-hidden select-none`}
    >
      {/* Inline styles for custom properties and keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500&display=swap');

        .feag-loader-container {
          font-family: 'Inter', sans-serif;
        }

        /* Background glows removed */

        .feag-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 9vw, 3rem);
          letter-spacing: .14em;
          color: #F8AD17;
          line-height: 1;
          margin-bottom: 7px;
        }

        .feag-track {
          width: 100%;
          height: 3px;
          background: rgba(248, 173, 23, .2);
          border-radius: 999px;
          overflow: visible;
          position: relative;
          margin-bottom: 12px;
        }

        .feag-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #F8AD17 0%, #ffd166 70%, #ffffff 100%);
          animation: feag-bar-grow 3.5s cubic-bezier(.4, 0, .2, 1) 1 forwards;
          width: 0%;
          position: relative;
        }

        .feag-fill::after {
          content: '';
          position: absolute;
          right: -5px; top: 50%;
          transform: translateY(-50%);
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 0 3px #F8AD17;
        }

        @keyframes feag-bar-grow {
          0%   { width: 0%; }
          100% { width: 100%; }
        }

        .feag-step {
          font-size: .8rem;
          font-weight: 500;
          letter-spacing: .10em;
          text-transform: uppercase;
          color: rgba(248, 173, 23, .75);
          height: 1.5em;
          position: relative;
          text-align: center;
          width: 100%;
          margin-bottom: 8px;
        }

        .feag-step span {
          position: absolute;
          left: 0; right: 0;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity .3s ease, transform .3s ease;
          white-space: nowrap;
        }

        .feag-step span.visible { 
          opacity: 1; 
          transform: translateY(0);
        }

        .feag-loader-text {
          font-size: .68rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: rgba(71, 85, 105, 0.8);
          text-align: center;
          white-space: nowrap;
        }
      ` }} />

      <div className="feag-loader-container feag-loader-bg-glow flex flex-col items-center gap-0 w-[min(260px,72vw)] relative z-10">
        <div className="feag-brand">FEAG</div>

        <div className="feag-track">
          <div className="feag-fill"></div>
        </div>

        {/* Steps display */}
        <div className="feag-step">
          {steps.map((step, idx) => (
            <span
              key={idx}
              className={idx === currentStep ? "visible" : ""}
            >
              {step}
            </span>
          ))}
        </div>

        <span className="feag-loader-text">For empowering ambitious generation</span>
      </div>
    </div>
  );
}
