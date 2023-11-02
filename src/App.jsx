import React, { useState, useEffect } from 'react';
import swordImage from '../public/assets/sword.jpeg';
import crashImage from '../public/assets/crash.png';
import ResultList from './components/resultList';

const App = () => {
  const [randomValue, setRandomValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [results, setResults] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animationDuration = 3000;
    const waitDuration = 2000;
    const waitMessageDuration = 10000;

    const animate = () => {
      let random = 0;
      setIsAnimating(true);

      const animationInterval = setInterval(() => {
        if (currentValue < random) {
          setCurrentValue((prevValue) => {
            if (prevValue < random) {
              return prevValue + 1;
            }
            return prevValue;
          });
        } else {
          clearInterval(animationInterval);
          setIsAnimating(false);
          setIsWaiting(true);
          setTimeout(() => {
            setIsWaiting(false);
            setResults((prevResults) => [random, ...prevResults].slice(0, 15));
            generateRandom();
          }, waitMessageDuration);
        }
      }, (animationDuration / random) * 0.1);

      const generateRandom = () => {
        random = Math.floor(Math.random() * 9999) + 1;
        setRandomValue(random);
        setCurrentValue(0);
        setIsAnimating(true);
      };

      generateRandom();
    };

    animate();
  }, []);

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center relative">
      <div className="w-full max-w-screen-xl mx-auto relative">
        <video autoPlay loop muted className="w-full h-auto object-cover">
          <source src="./assets/space.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>

        <div className="absolute inset-0">
          <div className="border-b border-white w-full absolute top-1/2 left-0"></div>
          <div className="border-r border-white h-full absolute top-0 left-1/2"></div>
          <img
            src={crashImage}
            alt="Crash"
            className={`absolute bottom-0 left-0 w-24 h-auto ${
              isAnimating ? 'animate-bounce' : ''
            }`}
          />
        </div>

        <img
          src={swordImage}
          alt="Espada"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-auto"
        />
      </div>

      <div className="text-white text-4xl mb-8">
        {isWaiting ? 'Waiting for the next round ;)' : currentValue}
      </div>

      <ResultList results={results} />
    </div>
  );
};

export default App;
