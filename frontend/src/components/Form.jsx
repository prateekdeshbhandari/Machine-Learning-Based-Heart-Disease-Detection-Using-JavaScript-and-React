import React, { useState } from 'react';
import { predict } from '../../../../../../../api';


const defaultValues = {
age: 63, sex: 1, cp: 3, trestbps: 145, chol: 233, fbs: 1,
restecg: 0, thalach: 150, exang: 0, oldpeak: 2.3, slope: 0, ca: 0, thal: 1
};


export default function Form({ onResult }) {
const [form, setForm] = useState(defaultValues);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


function handleChange(e) {
const { name, value } = e.target;
setForm(prev => ({ ...prev, [name]: value }));
}


async function handleSubmit(e) {
e.preventDefault();
setLoading(true);
setError(null);
try {
const json = await predict(form);
onResult(json);
} catch (err) {
setError(err.message || 'Network error');
} finally {
setLoading(false);
}
}


return (
<form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
{Object.keys(defaultValues).map(key => (
<div key={key} style={{ marginBottom: 8 }}>
<label style={{ display: 'block' }}>{key}</label>
<input name={key} value={form[key]} onChange={handleChange} />
</div>
))}
<button type="submit" disabled={loading}>{loading ? 'Predicting...' : 'Predict'}</button>
{error && <div style={{ color: 'red' }}>{error}</div>}
</form>
);
}