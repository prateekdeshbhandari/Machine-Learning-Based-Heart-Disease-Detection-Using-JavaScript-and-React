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
              {/* Personal Info */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👤</span>
                  <h3 className="text-lg font-semibold text-purple-200">Demographics</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Age</label>
                    <input 
                      type="number" 
                      name="age" 
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Enter age"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Sex</label>
                    <select 
                      name="sex" 
                      value={formData.sex}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    >
                      <option value="1" className="bg-slate-800">Male</option>
                      <option value="0" className="bg-slate-800">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💓</span>
                  <h3 className="text-lg font-semibold text-purple-200">Vital Signs</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Resting BP (mm Hg)</label>
                    <input 
                      type="number" 
                      name="trestbps" 
                      value={formData.trestbps}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                      placeholder="120"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Max Heart Rate (bpm)</label>
                    <input 
                      type="number" 
                      name="thalach" 
                      value={formData.thalach}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                      placeholder="150"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Work */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🩸</span>
                  <h3 className="text-lg font-semibold text-purple-200">Blood Work</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Cholesterol (mg/dl)</label>
                    <input 
                      type="number" 
                      name="chol" 
                      value={formData.chol}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                      placeholder="200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Fasting Blood Sugar &gt; 120</label>
                    <select 
                      name="fbs" 
                      value={formData.fbs}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">No</option>
                      <option value="1" className="bg-slate-800">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Clinical Parameters */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚡</span>
                  <h3 className="text-lg font-semibold text-purple-200">Clinical Parameters</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Chest Pain Type</label>
                    <select 
                      name="cp" 
                      value={formData.cp}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">Typical Angina</option>
                      <option value="1" className="bg-slate-800">Atypical Angina</option>
                      <option value="2" className="bg-slate-800">Non-Anginal Pain</option>
                      <option value="3" className="bg-slate-800">Asymptomatic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Resting ECG</label>
                    <select 
                      name="restecg" 
                      value={formData.restecg}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">Normal</option>
                      <option value="1" className="bg-slate-800">ST-T Abnormality</option>
                      <option value="2" className="bg-slate-800">LV Hypertrophy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Exercise Angina</label>
                    <select 
                      name="exang" 
                      value={formData.exang}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">No</option>
                      <option value="1" className="bg-slate-800">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">ST Depression</label>
                    <input 
                      type="number" 
                      step="0.1"
                      name="oldpeak" 
                      value={formData.oldpeak}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                      placeholder="0.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Slope</label>
                    <select 
                      name="slope" 
                      value={formData.slope}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">Upsloping</option>
                      <option value="1" className="bg-slate-800">Flat</option>
                      <option value="2" className="bg-slate-800">Downsloping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Major Vessels</label>
                    <select 
                      name="ca" 
                      value={formData.ca}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">0</option>
                      <option value="1" className="bg-slate-800">1</option>
                      <option value="2" className="bg-slate-800">2</option>
                      <option value="3" className="bg-slate-800">3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Thalassemia</label>
                    <select 
                      name="thal" 
                      value={formData.thal}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    >
                      <option value="0" className="bg-slate-800">Normal</option>
                      <option value="1" className="bg-slate-800">Fixed Defect</option>
                      <option value="2" className="bg-slate-800">Reversible Defect</option>
                    </select>
                  </div>
                </div>
              </div>

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
                      <h3 className="text-xl font-bold text-red-300 mb-2">Connection Error</h3>
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