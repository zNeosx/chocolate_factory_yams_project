import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCombinationRequest, getPastriesRewardRequest } from "../api";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dices, setDices] = useState([]);
  const [result, setResult] = useState({});

  const getCombination = () => {
    getCombinationRequest()
      .then(({ data }) => {
        setDices(data.dices);
        setResult(data.result);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => console.log(error));
  };
  const getPastriesReward = () => {
    getPastriesRewardRequest(result.pastries)
      .then(({ data }) => {
        if (data.pastries.length > 1) {
          alert(
            `Vous avez gagné : ${data.pastries[0].name} et ${data.pastries[1].name}`
          );
          navigate("/mypastries");
        } else {
          alert(`Vous avez gagné : ${data.pastries[0].name}`);
          navigate("/mypastries");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div id="home">
      <span className="play-btn" onClick={() => getCombination()}>
        Tenter sa chance
      </span>
      {!isLoading && result.success && (
        <div className="result success">
          <span className="result-combination">{result.combination}</span>
          <span className="result-message">{result.message}</span>
          <span className="result-btn" onClick={() => getPastriesReward()}>
            Récupérer ma récompense
          </span>
        </div>
      )}
      {!isLoading && result.success === false && (
        <div className="result">
          <span className="result-combination">{result.combination}</span>
          <span className="result-message">{result.message}</span>
        </div>
      )}
      <div className="game-container">
        {isLoading
          ? dices.map((dice, index) => (
              <div className="dice loading" key={index}>
                <span></span>
              </div>
            ))
          : dices.map((dice, index) => (
              <div className="dice" key={index}>
                <span>{dice}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
