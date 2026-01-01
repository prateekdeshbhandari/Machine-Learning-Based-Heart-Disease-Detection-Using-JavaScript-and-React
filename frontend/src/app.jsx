import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '1',
    cp: '0',
    trestbps: '',
    chol: '',
    fbs: '0',
    restecg: '0',
    thalach: '',
    exang: '0',
    oldpeak: '',
    slope: '0',
    ca: '0',
    thal: '0'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(formData.age),
          sex: parseInt(formData.sex),
          cp: parseInt(formData.cp),
          trestbps: parseInt(formData.trestbps),
          chol: parseInt(formData.chol),
          fbs: parseInt(formData.fbs),
          restecg: parseInt(formData.restecg),
          thalach: parseInt(formData.thalach),
          exang: parseInt(formData.exang),
          oldpeak: parseFloat(formData.oldpeak),
          slope: parseInt(formData.slope),
          ca: parseInt(formData.ca),
          thal: parseInt(formData.thal)
        })
      });

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ error: 'Failed to connect to server. Make sure backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '0 auto', 
      padding: 20, 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: 30 }}>
          ❤️ Heart Disease Prediction Dashboard
        </h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 15 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Age:</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Sex:</label>
              <select 
                name="sex" 
                value={formData.sex}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Chest Pain Type:</label>
              <select 
                name="cp" 
                value={formData.cp}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-Anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Resting Blood Pressure:</label>
              <input 
                type="number" 
                name="trestbps" 
                value={formData.trestbps}
                onChange={handleInputChange}
                placeholder="mm Hg"
                required
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Cholesterol:</label>
              <input 
                type="number" 
                name="chol" 
                value={formData.chol}
                onChange={handleInputChange}
                placeholder="mg/dl"
                required
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fasting Blood Sugar > 120 mg/dl:</label>
              <select 
                name="fbs" 
                value={formData.fbs}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Resting ECG:</label>
              <select 
                name="restecg" 
                value={formData.restecg}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">Normal</option>
                <option value="1">ST-T Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Max Heart Rate:</label>
              <input 
                type="number" 
                name="thalach" 
                value={formData.thalach}
                onChange={handleInputChange}
                placeholder="bpm"
                required
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Exercise Induced Angina:</label>
              <select 
                name="exang" 
                value={formData.exang}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>ST Depression:</label>
              <input 
                type="number" 
                step="0.1"
                name="oldpeak" 
                value={formData.oldpeak}
                onChange={handleInputChange}
                placeholder="0.0"
                required
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Slope:</label>
              <select 
                name="slope" 
                value={formData.slope}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Major Vessels:</label>
              <select 
                name="ca" 
                value={formData.ca}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Thalassemia:</label>
              <select 
                name="thal" 
                value={formData.thal}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4 }}
              >
                <option value="0">Normal</option>
                <option value="1">Fixed Defect</option>
                <option value="2">Reversible Defect</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              backgroundColor: loading ? '#95a5a6' : '#3498db',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: 5,
              fontSize: 16,
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 20
            }}
          >
            {loading ? '🔄 Analyzing...' : '🔍 Predict Heart Disease Risk'}
          </button>
        </form>

        {prediction && (
          <div style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 8,
            backgroundColor: prediction.error ? '#ffebee' : (prediction.prediction === 1 ? '#ffebee' : '#e8f5e8'),
            border: `2px solid ${prediction.error ? '#f44336' : (prediction.prediction === 1 ? '#f44336' : '#4caf50')}`
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: prediction.error ? '#f44336' : (prediction.prediction === 1 ? '#f44336' : '#2e7d32') }}>
              Prediction Result:
            </h3>
            {prediction.error ? (
              <p style={{ margin: 0, color: '#f44336' }}>❌ {prediction.error}</p>
            ) : (
              <div>
                <p style={{ margin: '0 0 10px 0', fontSize: 18, fontWeight: 'bold' }}>
                  {prediction.risk}
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  Prediction Value: {prediction.prediction} {prediction.prediction === 1 ? '(Heart Disease Detected)' : '(No Heart Disease)'}
                </p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 30, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
          <h4 style={{ margin: '0 0 10px 0' }}>📋 Instructions:</h4>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>Fill in all the medical parameters above</li>
            <li>Make sure the backend server is running (npm start in backend folder)</li>
            <li>Click "Predict Heart Disease Risk" to get the analysis</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
