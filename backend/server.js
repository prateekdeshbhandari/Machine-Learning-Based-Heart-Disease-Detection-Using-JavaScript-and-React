// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());
app.use(express.json());

console.log("✅ Heart Disease Prediction Server Ready");

// Load CSV into memory
let heartData = [];
fs.createReadStream("heart.csv")
  .pipe(csv())
  .on("data", (row) => {
    // Convert all numeric fields to numbers
    heartData.push({
      age: Number(row.age),
      sex: Number(row.sex),
      cp: Number(row.cp),
      trestbps: Number(row.trestbps),
      chol: Number(row.chol),
      fbs: Number(row.fbs),
      restecg: Number(row.restecg),
      thalach: Number(row.thalach),
      exang: Number(row.exang),
      oldpeak: Number(row.oldpeak),
      slope: Number(row.slope),
      ca: Number(row.ca),
      thal: Number(row.thal),
      target: Number(row.target)
    });
  })
  .on("end", () => {
    console.log(`✅ Loaded ${heartData.length} rows from CSV`);
  });

// ----------------------------
// ML-like Heart Disease Predictor (heuristic)
// ----------------------------
function predictHeartDisease(features) {
  const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = features;

  let score = 0;

  // Age
  if (age < 35) score -= 0.5;
  else if (age <= 45) score += 0;
  else if (age <= 55) score += 0.3;
  else if (age <= 65) score += 0.7;
  else score += 1.0;

  // Sex
  if (sex === 1) score += 0.4;

  // Chest Pain Type
  if (cp === 3) score += 0.8;
  else if (cp === 0) score += 0.6;
  else if (cp === 1) score += 0.3;
  else if (cp === 2) score += 0.1;

  // Blood Pressure
  if (trestbps <= 120) score -= 0.1;
  else if (trestbps <= 140) score += 0.1;
  else if (trestbps <= 160) score += 0.4;
  else score += 0.7;

  // Cholesterol
  if (chol < 200) score -= 0.2;
  else if (chol <= 240) score += 0.1;
  else if (chol <= 300) score += 0.4;
  else score += 0.6;

  // Fasting Blood Sugar
  if (fbs === 1) score += 0.2;

  // Resting ECG
  if (restecg === 1) score += 0.3;
  else if (restecg === 2) score += 0.5;

  // Max Heart Rate
  if (thalach >= 180) score -= 0.4;
  else if (thalach >= 160) score -= 0.2;
  else if (thalach >= 140) score += 0.1;
  else if (thalach >= 120) score += 0.5;
  else score += 0.9;

  // Exercise Induced Angina
  if (exang === 1) score += 0.6;

  // ST Depression
  if (oldpeak === 0) score -= 0.2;
  else if (oldpeak <= 1) score += 0.2;
  else if (oldpeak <= 2) score += 0.5;
  else score += 0.8;

  // Slope
  if (slope === 0) score -= 0.3;
  else if (slope === 1) score += 0.2;
  else score += 0.6;

  // Major Vessels
  if (ca === 0) score -= 0.4;
  else if (ca === 1) score += 0.3;
  else if (ca === 2) score += 0.7;
  else score += 1.0;

  // Thalassemia
  if (thal === 0) score -= 0.2;
  else if (thal === 1) score += 0.3;
  else score += 0.7;

  // Sigmoid for probability
  const probability = 1 / (1 + Math.exp(-score));

  // Decision
  let prediction = 0; // 0 = No Risk
  if (probability > 0.6) prediction = 1; // Moderate or High Risk

  // Determine risk category
  let riskCategory = "";
  if (probability > 0.85) riskCategory = "🚨 Very High Risk";
  else if (probability > 0.7) riskCategory = "⚠️ High Risk";
  else if (probability > 0.6) riskCategory = "⚠️ Moderate Risk";
  else if (probability > 0.4) riskCategory = "💛 Low Risk";
  else if (probability > 0.2) riskCategory = "✅ Very Low Risk";
  else riskCategory = "✅ No Risk";

  // Confidence (distance from 0.5)
  const confidence = Math.min(Math.max(Math.abs(probability - 0.5) * 2, 0.6), 0.95);

  return {
    prediction,
    probability: Number(probability.toFixed(3)),
    confidence: Number((confidence * 100).toFixed(0)),
    riskScore: Number(score.toFixed(2)),
    riskCategory
  };
}

// ----------------------------
// API Endpoint
// ----------------------------
app.post("/api/predict", (req, res) => {
  try {
    const features = {
      age: Number(req.body.age) || 0,
      sex: Number(req.body.sex) || 0,
      cp: Number(req.body.cp) || 0,
      trestbps: Number(req.body.trestbps) || 0,
      chol: Number(req.body.chol) || 0,
      fbs: Number(req.body.fbs) || 0,
      restecg: Number(req.body.restecg) || 0,
      thalach: Number(req.body.thalach) || 0,
      exang: Number(req.body.exang) || 0,
      oldpeak: Number(req.body.oldpeak) || 0,
      slope: Number(req.body.slope) || 0,
      ca: Number(req.body.ca) || 0,
      thal: Number(req.body.thal) || 0
    };

    console.log("Processing patient data:", features);

    const result = predictHeartDisease(features);

    console.log("Prediction result:", result);

    res.json(result);
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// Start Server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
