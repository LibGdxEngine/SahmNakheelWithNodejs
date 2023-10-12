import { useEffect, useState } from "react";
import Heart from "./Heart";

const FloatingHearts = () => {

  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((heart, index) => (
        <Heart key={index} x={heart.x} y={heart.y} />
      ))}
    </>
  );
};

export default FloatingHearts;
