import axios from "axios";

const API_URL = "http://localhost:5000/api/predict"; // Node.js backend

export const getPrediction = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (err) {
    console.error(err);
    return { error: "Server error" };
  }
};
