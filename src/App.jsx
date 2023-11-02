import React, { useState, useEffect } from 'react';
import swordImage from '../public/assets/sword.jpeg'; // Importe a imagem

const App = () => {
  const [randomValue, setRandomValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const animationDuration = 3000; // Duração da animação em milissegundos
    const waitDuration = 2000; // Duração da pausa em milissegundos após atingir o valor gerado
    const step = 1; // Valor de incremento a cada iteração

    const animate = () => {
      const random = Math.floor(Math.random() * 9999) + 1;
      setRandomValue(random);

      let stepCount = 0;

      const animationInterval = setInterval(() => {
        if (stepCount < random) {
          setCurrentValue((prevValue) => prevValue + step);
          stepCount += 1;
        } else {
          clearInterval(animationInterval);
          setTimeout(() => {
            setCurrentValue(0); // Redefinir para zero após a pausa
            animate(); // Iniciar a animação novamente
          }, waitDuration);
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
        <img src={swordImage} alt="Espada" className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-auto" />
      </div>

      {/* Exibir o valor atual do número animado */}
      <div className="text-white text-4xl mb-8">
        {currentValue}
      </div>

      {/* Renderizar componentes de jogo aqui */}
    </div>
  );
};

export default App;
