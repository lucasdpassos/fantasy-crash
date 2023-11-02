import React, { useState, useEffect } from 'react';
import swordImage from '../public/assets/sword.jpeg'; // Importe a imagem
import crashImage from '../public/assets/crash.png'; // Importe a imagem do crash
import ResultHistory from './components/ResultHistory'; // Importe o novo componente

const App = () => {
  const [randomValue, setRandomValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [results, setResults] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animationDuration = 3000; // Duração da animação em milissegundos
    const waitDuration = 2000; // Duração da pausa em milissegundos após atingir o valor gerado
    const waitMessageDuration = 10000; // Duração da mensagem de espera em milissegundos

    const step = 1; // Valor de incremento a cada iteração

    const animate = () => {
      const random = Math.floor(Math.random() * 9999) + 1;
      setRandomValue(random);

      let stepCount = 0;

      const animationInterval = setInterval(() => {
        if (stepCount < random) {
          setCurrentValue((prevValue) => {
            if (prevValue < random) {
              return prevValue + step;
            }
            return prevValue;
          });
          stepCount += 1;
        } else {
          clearInterval(animationInterval);
          setIsAnimating(false);
          setIsWaiting(true);
          setTimeout(() => {
            setIsWaiting(false);
            setCurrentValue(0); // Redefinir para zero após a pausa
            setResults((prevResults) => [random, ...prevResults].slice(0, 15));
            animate(); // Iniciar a animação novamente
          }, waitMessageDuration);
        }
      }, animationDuration / random);
    };

    animate(); // Iniciar a primeira animação
  }, []); // Use um array vazio para garantir que este efeito seja executado apenas uma vez

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center relative">
      <div className="w-full max-w-screen-xl mx-auto relative">
        <video autoPlay loop muted className="w-full h-auto object-cover">
          <source src="./assets/space.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>

        {/* Adicionar as linhas (eixo x e eixo y) e a imagem do crash no ponto (0, 0) */}
        <div className="absolute inset-0">
          <div className="border-b border-white w-full absolute top-1/2 left-0"></div>
          <div className="border-r border-white h-full absolute top-0 left-1/2"></div>
          <img
            src={crashImage}
            alt="Crash"
            className={`absolute bottom-0 left-0 w-24 h-auto ${isWaiting ? '' : 'animate-bounce'}`}
          />
        </div>

        {/* Ajustar a posição da imagem "sword" para o lado direito usando CSS */}
        <img
          src={swordImage}
          alt="Espada"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-auto"
        />
      </div>

      {/* Exibir o valor atual do número animado ou a mensagem de espera */}
      <div className="text-white text-4xl mb-8">
        {isWaiting ? 'Waiting for the next round ;)' : currentValue}
      </div>

      {/* Renderizar o histórico de resultados */}
      <ResultHistory history={results} />
    </div>
  );
};

export default App;
