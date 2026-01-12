import React, { useState } from "react";

const defaultValues = {
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
};

const fieldLabels = {
  age: 'Age',
  sex: 'Sex',
  cp: 'Chest Pain Type',
  trestbps: 'Resting Blood Pressure (mm Hg)',
  chol: 'Cholesterol (mg/dl)',
  fbs: 'Fasting Blood Sugar > 120 mg/dl',
  restecg: 'Resting ECG',
  thalach: 'Max Heart Rate (bpm)',
  exang: 'Exercise Induced Angina',
  oldpeak: 'ST Depression',
  slope: 'Slope',
  ca: 'Major Vessels',
  thal: 'Thalassemia'
};

const selectOptions = {
  sex: [
    { value: 1, label: 'Male' },
    { value: 0, label: 'Female' }
  ],
  cp: [
    { value: 0, label: 'Typical Angina' },
    { value: 1, label: 'Atypical Angina' },
    { value: 2, label: 'Non-Anginal Pain' },
    { value: 3, label: 'Asymptomatic' }
  ],
  fbs: [
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' }
  ],
  restecg: [
    { value: 0, label: 'Normal' },
    { value: 1, label: 'ST-T Abnormality' },
    { value: 2, label: 'LV Hypertrophy' }
  ],
  exang: [
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' }
  ],
  slope: [
    { value: 0, label: 'Upsloping' },
    { value: 1, label: 'Flat' },
    { value: 2, label: 'Downsloping' }
  ],
  ca: [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' }
  ],
  thal: [
    { value: 0, label: 'Normal' },
    { value: 1, label: 'Fixed Defect' },
    { value: 2, label: 'Reversible Defect' }
  ]
};

const fieldGroups = {
  demographics: ['age', 'sex'],
  vitals: ['trestbps', 'thalach'],
  blood: ['chol', 'fbs'],
  clinical: ['cp', 'restecg', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
};

const groupTitles = {
  demographics: { title: 'Demographics', icon: '👤' },
  vitals: { title: 'Vital Signs', icon: '💓' },
  blood: { title: 'Blood Work', icon: '🩸' },
  clinical: { title: 'Clinical Parameters', icon: '⚡' }
};

export default function App() {
  const [formData, setFormData] = useState(defaultValues);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.age || !formData.trestbps || !formData.chol || !formData.thalach || !formData.oldpeak) {
      setPrediction({ error: 'Please fill in all required fields.' });
      return;
    }

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

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ error: 'Failed to connect to server. Make sure backend is running on port 5000.' });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (key) => {
    const isSelect = selectOptions[key];
    const step = key === 'oldpeak' ? '0.1' : '1';

    return (
      <div key={key}>
        <label className="block text-sm font-medium text-purple-200 mb-2">
          {fieldLabels[key]}
        </label>
        {isSelect ? (
          <select
            name={key}
            value={formData[key]}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          >
            {selectOptions[key].map(option => (
              <option key={option.value} value={option.value} className="bg-slate-800">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            step={step}
            name={key}
            value={formData[key]}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-2xl shadow-lg shadow-pink-500/50">
              <span className="text-4xl">❤️</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              CardioPredict
            </h1>
          </div>
          <p className="text-purple-200 text-lg">AI-Powered Heart Disease Risk Assessment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📊</span>
              <h2 className="text-2xl font-bold text-white">Patient Information</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(fieldGroups).map(([groupKey, fields]) => (
                <div key={groupKey} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{groupTitles[groupKey].icon}</span>
                    <h3 className="text-lg font-semibold text-purple-200">
                      {groupTitles[groupKey].title}
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {fields.map(field => renderField(field))}
                  </div>
                </div>
              ))}

              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-pink-500/50 hover:shadow-pink-600/50 disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <span className="animate-spin text-2xl">🔄</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📈</span>
                    Predict Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {prediction ? (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 sticky top-6">
                {prediction.error ? (
                  <div className="text-center">
                    <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 mb-4">
                      <span className="text-6xl block mb-3">⚠️</span>
                      <h3 className="text-xl font-bold text-red-300 mb-2">Error</h3>
                      <p className="text-red-200 text-sm">{prediction.error}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Risk Status */}
                    <div className={`${prediction.prediction === 1 ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-500/50' : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50'} border rounded-2xl p-6 text-center`}>
                      {prediction.prediction === 1 ? (
                        <span className="text-6xl block mb-3">⚠️</span>
                      ) : (
                        <span className="text-6xl block mb-3">✅</span>
                      )}
                      <h3 className={`text-2xl font-bold mb-2 ${prediction.prediction === 1 ? 'text-red-300' : 'text-green-300'}`}>
                        {prediction.prediction === 1 ? 'High Risk' : 'Low Risk'}
                      </h3>
                      <p className="text-purple-200 text-sm">
                        {prediction.prediction === 1 ? 'Heart Disease Detected' : 'No Significant Risk'}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-3">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-200 text-sm font-medium">Probability</span>
                          <span className="text-white text-xl font-bold">
                            {prediction.probability ? (prediction.probability * 100).toFixed(0) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${prediction.probability ? (prediction.probability * 100) : 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200 text-sm font-medium">Confidence</span>
                          <span className="text-white text-xl font-bold">{prediction.confidence || 0}%</span>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200 text-sm font-medium">Risk Score</span>
                          <span className="text-white text-xl font-bold">{prediction.riskScore || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className={`${prediction.prediction === 1 ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'} border rounded-xl p-4`}>
                      <p className={`text-sm font-medium ${prediction.prediction === 1 ? 'text-red-200' : 'text-green-200'}`}>
                        {prediction.prediction === 1 
                          ? '⚠️ Please consult a cardiologist for proper medical evaluation.'
                          : '✓ Maintain a healthy lifestyle and regular checkups.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 sticky top-6">
                <div className="text-center text-purple-200">
                  <span className="text-6xl block mx-auto mb-4 opacity-50">❤️</span>
                  <p className="text-lg font-medium mb-2">Awaiting Analysis</p>
                  <p className="text-sm opacity-75">Fill in the form and click "Predict Risk" to get your assessment</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">ℹ️</span>
            <div>
              <h4 className="text-white font-semibold mb-2">Medical Disclaimer</h4>
              <p className="text-purple-200 text-sm leading-relaxed">
                This tool is for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for medical decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
