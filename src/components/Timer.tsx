"use client";

import React, { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";

const Timer = ({ date = "" }: { date: string }) => {
  const targetDate = new Date(date).getTime();
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
    <div className="flex my-2 items-center justify-center gap-2 text-primary py-1 px-2 rounded-md font-secondary">
      <div>
        <NumberFlow
          value={timeLeft.days}
          className="font-semibold font-primary"
        />
        <span> Days,</span>
      </div>
      <div>
        <NumberFlow
          value={timeLeft.hours}
          className="font-semibold font-primary"
        />
        <span> Hrs,</span>
      </div>
      <div>
        <NumberFlow
          value={timeLeft.minutes}
          className="font-semibold font-primary"
        />
        <span> Mins,</span>
      </div>
      <div>
        <NumberFlow
          value={timeLeft.seconds}
          className="font-semibold font-primary"
        />
        <span> Sec</span>
      </div>
      Left
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
