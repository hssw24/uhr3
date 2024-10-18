import React, { useEffect, useState } from "react";
import "./ClockApp.css"; // Stile für die Uhr und das Spiel

const generateRandomTime = () => {
  const hour = Math.floor(Math.random() * 12);
  const minute = Math.floor(Math.random() * 12) * 5;
  return { hour, minute };
};

const ClockApp = () => {
  const [targetTime, setTargetTime] = useState(generateRandomTime());
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  // Funktion zur Erstellung der Antwortmöglichkeiten
  const generateOptions = (correctTime) => {
    const options = [correctTime];
    while (options.length < 6) {
      const option = generateRandomTime();
      if (
        !options.some(
          (opt) => opt.hour === option.hour && opt.minute === option.minute
        )
      ) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5); // Mische die Optionen
  };

  // Funktion zur Überprüfung der Antwort
  const handleOptionClick = (option) => {
    if (option.hour === targetTime.hour && option.minute === targetTime.minute) {
      setCorrect(correct + 1);
    }
    setTotal(total + 1);
    setTargetTime(generateRandomTime());
  };

  useEffect(() => {
    setOptions(generateOptions(targetTime));
  }, [targetTime]);

  const formatTime = (hour, minute) => {
    const formattedHour = hour === 0 ? 12 : hour;
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
  };

  // Funktion zum Berechnen der Rotationen für die Zeiger
  const getHourRotation = () => {
    return (targetTime.hour % 12) * 30 + targetTime.minute * 0.5;
  };

  const getMinuteRotation = () => {
    return targetTime.minute * 6;
  };

  return (
    <div>
      <div className="stats">
        <p>Richtige Antworten: {correct}</p>
        <p>Gesamte Antworten: {total}</p>
      </div>
      <div className="clock">
        <div
          className="hour-hand"
          style={{
            transform: `translate(-50%, -100%) rotate(${getHourRotation()}deg)`,
          }}
        />
        <div
          className="minute-hand"
          style={{
            transform: `translate(-50%, -100%) rotate(${getMinuteRotation()}deg)`,
          }}
        />
        <div className="center-point" />
        <div className="numbers">
          {[...Array(12)].map((_, index) => {
            const angle = (index + 1) * 30;
            const x = 50 + 40 * Math.sin((angle * Math.PI) / 180);
            const y = 50 - 40 * Math.cos((angle * Math.PI) / 180);
            return (
              <div
                key={index}
                className={`number ${index + 1}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
          >
            {formatTime(option.hour, option.minute)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClockApp;
