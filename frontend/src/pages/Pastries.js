import React, { useEffect, useState } from "react";
import { getPastriesWonRequest } from "../api";

const Pastries = () => {
  const [pastries, setPastries] = useState([]);
  useEffect(() => {
    getPastriesWonRequest()
      .then(({ data }) => setPastries(data.pastries))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="patries">
      <h1>Toutes les pâtisseries gagnées</h1>
      <div className="patries-container page-container">
        {pastries.map((pastrie, index) => (
          <div className="patrie" key={index}>
            <span className="patrie-name">{pastrie.name}</span>
            <span className="patrie-date">
              Gagnée le {pastrie.createdAt} par {pastrie.winnerFirstname}{" "}
              {pastrie.winnerName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pastries;
