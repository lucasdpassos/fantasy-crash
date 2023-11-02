import React, { useState, useEffect } from 'react';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [randomValue, setRandomValue] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      // Lógica para iniciar o jogo, gerar um valor random e animações
      const random = Math.floor(Math.random() * 9999) + 1;
      setRandomValue(random);

      // Iniciar animações, se necessário
    }
  }, [gameStarted]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      {gameStarted ? (
        // Renderizar componentes de jogo aqui
        <div>
          <div className="text-white text-4xl mb-8">
            Valor Random: {randomValue}
          </div>
          {/* Adicione componentes de jogo, como a espada animada e o contador aqui */}
        </div>
      ) : (
        // Tela inicial
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartGame}
        >
          Iniciar Jogo
        </button>
      )}
    </div>
  );
};

export default App;
