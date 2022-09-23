import React, { useEffect, useState } from "react";
import { getPastriesWonRequest } from "../api";

const Pastries = () => {
  const [awards, setAwards] = useState([]);
  useEffect(() => {
    getPastriesWonRequest()
      .then(({ data }) => setAwards(data.awards))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="patries">
      <h1>Toutes les pâtisseries gagnées</h1>
      <div className="patries-container page-container">
        {awards?.map((award) => {
          return award.pastries.map((pastrie) => (
            <div className="patrie" key={pastrie._id}>
              <span className="patrie-name">{pastrie.name}</span>
              <span className="patrie-date">
                Gagnée par {award.userId.firstname} {award.userId.lastname}
              </span>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default Pastries;
