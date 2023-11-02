import React from 'react';

const ResultList = ({ history }) => (
  <div className="text-white">
    <h3 className="text-lg mb-4">Histórico dos últimos resultados:</h3>
    <div className="flex flex-wrap">
      {history.map((result, index) => (
        <div key={index} className="mr-2 mb-2">
          {result}
        </div>
      ))}
    </div>
  </div>
);

export default ResultList;
