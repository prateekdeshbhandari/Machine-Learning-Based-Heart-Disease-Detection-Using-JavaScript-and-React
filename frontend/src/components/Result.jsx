import React from 'react';
export default function Result({ result }) {
if (!result) return null;
return (
<div style={{ marginTop: 16 }}>
<h3>Prediction</h3>
<div><strong>Label:</strong> {result.prediction}</div>
<div><strong>Risk:</strong> {result.risk}</div>
{result.probabilities && <div><strong>Probabilities:</strong> {JSON.stringify(result.probabilities)}</div>}
</div>
);
}