import React from 'react';

const ResultList = ({ results }) => {
  return (
    <div className="mt-4">
      <h2 className="text-white text-xl mb-2">Últimos 15 Resultados</h2>
      <div className="flex flex-wrap">
        {results.map((result, index) => (
          <div key={index} className="bg-gray-800 p-2 m-2 rounded-md">
            <span className="text-white">{result}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
