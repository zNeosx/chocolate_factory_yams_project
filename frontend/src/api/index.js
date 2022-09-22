import { Axios } from "../config";

// Pastries Requests

export const getAllPastriesRequest = () => {
  return Axios.get("pastries/getAllPastries", {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};
export const addPastryRequest = (data) => {
  return Axios.post("admin/addPastry", data, {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};

export const getCombinationRequest = () => {
  return Axios.get("/game/getCombination", {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};

export const getPastriesRewardRequest = (pastriesCount) => {
  return Axios.post(
    "/pastries/getPastriesReward",
    {
      pastries: pastriesCount,
    },
    {
      headers: {
        "x-access-token": `${sessionStorage.getItem("token")}`,
      },
    }
  );
};

export const getPastriesWonRequest = () => {
  return Axios.get("pastries/getPastriesWon", {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};
export const getUserPastriesRequest = () => {
  return Axios.get("pastries/getUserPastries", {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};

// User Requests
export const registerRequest = (formData) => {
  return Axios.post("/user/register", formData);
};
export const loginRequest = (formData) => {
  return Axios.post("/user/login", formData);
};

// Admin Requests
export const adminLoginRequest = (formData) => {
  return Axios.post("admin/login", formData);
};

export const deleteOnePastryRequest = (idPastry) => {
  return Axios.get(`admin/deletePastry/${idPastry}`, {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};

export const restoreOnePastryRequest = (idPastry) => {
  return Axios.get(`admin/restorePastry/${idPastry}`, {
    headers: {
      "x-access-token": `${sessionStorage.getItem("token")}`,
    },
  });
};
