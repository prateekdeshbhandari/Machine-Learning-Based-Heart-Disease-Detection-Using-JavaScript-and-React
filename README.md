# Heart Disease Detection

A full-stack web application for predicting heart disease using machine learning.

## Project Structure

```
heart detection/
├── backend/         # Node.js/Express API server
├── frontend/        # React + Vite web interface
├── ml/             # Python ML model training
└── README.md
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

The backend server will start on the default port (usually 3000 or as configured).

### 3. Setup Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite's default port).

## Usage

1. Make sure all three components are running:
   - ML model is trained and exported
   - Backend server is running
   - Frontend development server is running

2. Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

3. Enter patient data for heart disease prediction

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

## License

ISC

## Author

Prateek DeshBhandari

---
Co-Authored-By: Warp <agent@warp.dev>
