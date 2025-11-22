import React from "react";
import "./TitleStepper.css";

// Java analogy: TitleStepper is like a Java class,
// and the props (title, onPrev, onNext) are like
// constructor parameters / method callbacks you pass in.
export default function TitleStepper({ title, onPrev, onNext }) {
  return (
    <div className="title-stepper">
      <button
        className="stepper-arrow stepper-arrow-left"
        onClick={onPrev}
        aria-label="Previous"
      />
      <div className="stepper-title">{title}</div>
      <button
        className="stepper-arrow stepper-arrow-right"
        onClick={onNext}
        aria-label="Next"
      />
    </div>
  );
}

