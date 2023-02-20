import React, { useState, useEffect } from 'react';

type Props = {
  lastUpdateTime: number;
}

const Timer: React.FC<Props> = ({ lastUpdateTime }) => {
  const MAX_COUNTDOWN = 30
  const [time, setTime] = useState(MAX_COUNTDOWN);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    setTime(MAX_COUNTDOWN)
  }, [lastUpdateTime]);


  return (
    <div className="mt-5 mb-1">
      <div>
        <span>Price is valid for </span>
        <span className="font-bold">{time}</span>
        <span> seconds</span>
      </div>
    </div>
  );
};

export default Timer;