"use client";

import React, { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";

const Timer = () => {
  const targetDate = new Date("2024-12-06T04:27:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getTimeRemaining(targetDate);
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  const hideWidget =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (hideWidget) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-sm bg-secondary py-1 px-2 rounded-md">
      <div className="grid">
        <NumberFlow value={timeLeft.days} className="font-mono" />
        <span>Days</span>
      </div>

      <div className="grid">
        <NumberFlow value={timeLeft.hours} className="font-mono" />
        <span>Hrs</span>
      </div>

      <div className="grid">
        <NumberFlow value={timeLeft.minutes} className="font-mono" />
        <span>Mins</span>
      </div>

      <div className="grid">
        <NumberFlow value={timeLeft.seconds} className="font-mono" />
        <span>Sec</span>
      </div>
    </div>
  );
};

// Utility function to calculate time remaining
function getTimeRemaining(targetTime: number) {
  const total = targetTime - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

export default Timer;
