<<<<<<< HEAD
# Heart Disease Detection

A full-stack web application for predicting heart disease using machine learning.

## Project Structure

```
HEART DETECTION
│
├── backend
│   ├── api.js
│   ├── server.js
│   ├── heart_model.onnx
│   ├── heart.csv
│   ├── model
│   ├── node_modules
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── dist
│   │   ├── assets
│   │   └── index.html
│   │
│   ├── src
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── ml
│   ├── backend
│   ├── heart_model.onnx
│   ├── heart_pipeline.pkl
│   ├── heart.csv
│   └── train_export_onnx.py
│
├── node_modules
│
├── README.md

```

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **ML Model**: Python, scikit-learn, ONNX

## Prerequisites

- Node.js (v14 or higher)
- Python 3.7+
- npm or yarn

## Setup & Installation

### 1. Train the Machine Learning Model

First, install Python dependencies and train the model:

```bash
cd ml
pip install pandas numpy scikit-learn skl2onnx joblib
python train_export_onnx.py
```

This will:
- Train a Random Forest classifier on the heart disease dataset
- Export the model to ONNX format
- Save it to `backend/model/heart_model.onnx`

### 2. Setup Backend

```bash
cd backend
npm install
npm start
```
<img width="1632" height="424" alt="Screenshot 2026-01-01 164713" src="https://github.com/user-attachments/assets/d7c27ef6-e21a-479b-b6b6-c65c2ab28c41" />


The backend server will start on the default port (usually 3000 or as configured).

### 3. Setup Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```
<img width="1597" height="513" alt="Screenshot 2026-01-01 164856" src="https://github.com/user-attachments/assets/4e255cb4-8c84-49c0-987e-3e44bee8fd9d" />

The frontend will be available at `http://localhost:5173` (Vite's default port).

## Usage

1. Make sure all three components are running:
   - ML model is trained and exported
   - Backend server is running
   - Frontend development server is running

2. Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

3. Enter patient data for heart disease prediction
<img width="1140" height="851" alt="Screenshot 2026-01-01 165002" src="https://github.com/user-attachments/assets/e41faf7d-9cff-4cc2-9a10-84fdbf4551f6" />
## result
<img width="1014" height="858" alt="Screenshot 2026-01-01 170916" src="https://github.com/user-attachments/assets/8211b5fd-ae3a-4c25-b0e6-1eac4ac42ee1" />
<img width="993" height="645" alt="Screenshot 2026-01-01 171808" src="https://github.com/user-attachments/assets/fbf6b77b-6b76-4b20-848c-b47399c092cf" />

## Model Features

The model uses the following 13 features for prediction:

- **age**: Age in years
- **sex**: Sex (1 = male, 0 = female)
- **cp**: Chest pain type (0-3)
- **trestbps**: Resting blood pressure (mm Hg)
- **chol**: Serum cholesterol (mg/dl)
- **fbs**: Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
- **restecg**: Resting ECG results (0-2)
- **thalach**: Maximum heart rate achieved
- **exang**: Exercise induced angina (1 = yes, 0 = no)
- **oldpeak**: ST depression induced by exercise
- **slope**: Slope of peak exercise ST segment (0-2)
- **ca**: Number of major vessels colored by fluoroscopy (0-3)
- **thal**: Thalassemia (0-3)

## Development

### Backend Scripts
- `npm start` - Start the server

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build



## Author

### Prateek DeshBhandari
gnail:deshbhandariprateek7@gmail.com
