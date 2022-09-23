import React, { useEffect, useState } from "react";
import { getUserPastriesRequest } from "../api";

const UserPastries = () => {
  const [pastries, setPastries] = useState([]);
  useEffect(() => {
    getUserPastriesRequest()
      .then(({ data }) => setPastries(data.pastries))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="patries">
      <h1>Toutes mes pâtisseries gagnées</h1>
      <div className="patries-container page-container">
        {pastries.length > 0 ? (
          pastries.map((pastrie, index) => (
            <div className="patrie" key={index}>
              <span className="patrie-name">{pastrie.name}</span>
              {/* <span className="patrie-date">Gagnée le {pastrie.createdAt}</span> */}
            </div>
          ))
        ) : (
          <div className="no-patries">
            <span>Vous n'avez pas encore gagné de pâtisserie</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPastries;
