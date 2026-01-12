# train_export_onnx.py
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# for export
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import os
os.makedirs("backend/model", exist_ok=True)  # create folder if not exists


CSV = 'heart.csv'  # put your dataset here
COLUMNS = [
    'age','sex','cp','trestbps','chol','fbs','restecg',
    'thalach','exang','oldpeak','slope','ca','thal'
]

def load_and_clean(path):
    # Read CSV - try different methods
    try:
        # First try comma separator
        df = pd.read_csv(path)
        if len(df.columns) < 10:
            # Try tab separator
            df = pd.read_csv(path, delim_whitespace=True)
    except:
        df = pd.read_csv(path, delim_whitespace=True)
    
    # Fix column names - remove spaces
    new_cols = []
    for col in df.columns:
        col_clean = str(col).strip().replace(' ', '')
        new_cols.append(col_clean)
    df.columns = new_cols
    
    print(f"[INFO] Columns found: {list(df.columns)}")
    print(f"[INFO] Dataset shape: {df.shape}")
    
    # basic clean: coerce ? to NaN, convert types
    df.replace('?', np.nan, inplace=True)
    df = df.dropna()

    # ---- FIX: detect target column ----
    if 'target' in df.columns:
        target_col = 'target'
    elif 'num' in df.columns:   # common in UCI dataset
        target_col = 'num'
    else:
        # assume last column is target
        target_col = df.columns[-1]
        print(f"[INFO] Using column '{target_col}' as target")

    # Convert to binary 0/1 if multi-class
    if df[target_col].nunique() > 2:
        df[target_col] = (df[target_col] > 0).astype(int)

    X = df[COLUMNS].astype(float)
    y = df[target_col].astype(int)
    
    print(f"[INFO] Class distribution: {y.value_counts().to_dict()}")
    return X, y

if __name__ == '__main__':
    X, y = load_and_clean(CSV)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('rf', RandomForestClassifier(n_estimators=200, random_state=42))
    ])

    pipeline.fit(X_train, y_train)
    preds = pipeline.predict(X_test)
    print('Accuracy:', accuracy_score(y_test, preds))
    print(classification_report(y_test, preds))

    # save pipeline for local Python use (optional)
    joblib.dump(pipeline, 'ml/heart_pipeline.pkl')

    # Export to ONNX
    initial_type = [('float_input', FloatTensorType([None, X.shape[1]]))]
    onnx_model = convert_sklearn(pipeline, initial_types=initial_type)
    
    
with open("backend/model/heart_model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())

print("ONNX model saved to backend/model/heart_model.onnx")
