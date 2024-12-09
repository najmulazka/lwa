from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, cross_val_score
import pandas as pd
import re
import sys

data = {
    "text": [
        "be", 
        "backend", 
        "back end", 
        "back-end", 
        "bekend", 
        "data analis", 
        "data analysis", 
        "ilmuwan data", 
        "scientist data",
        "developer perangkat lunak", 
        "software developer", 
        "pengacara hukum", 
        "lawyer", 
        "dokter umum", 
        "general practitioner",
        "guru matematika", 
        "math teacher"
    ],
    "profession": [
        "Backend Developer", 
        "Backend Developer", 
        "Backend Developer", 
        "Backend Developer", 
        "Backend Developer", 
        "Data Analyst", 
        "Data Analyst", 
        "Data Scientist", 
        "Data Scientist", 
        "Software Developer", 
        "Software Developer", 
        "Lawyer", 
        "Lawyer", 
        "Doctor", 
        "Doctor", 
        "Teacher", 
        "Teacher"
    ]
}

# Preprocessing Teks
def preprocess_text(text):
    text = text.lower()               
    text = re.sub(r'[^\w\s]', '', text)    
    return text

# Preprocessing DataFrame
df = pd.DataFrame(data)
df['text'] = df['text'].apply(preprocess_text)  # Preprocessing teks

# Split Data Menjadi Training dan Testing
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['profession'], test_size=0.2, random_state=42)

# Pipeline Model
model = Pipeline([
    ('vectorizer', TfidfVectorizer()),      # Mengubah teks menjadi representasi TF-IDF
    ('classifier', MultinomialNB())        # Model klasifikasi Naive Bayes
])

# Training Model
model.fit(X_train, y_train)

# Evaluasi Model
score = model.score(X_test, y_test)
print(f"Akurasi Model (Test Set): {score:.2f}")

# Jika ingin menggunakan cross-validation dengan jumlah fold lebih sedikit (misalnya 3)
scores = cross_val_score(model, df['text'], df['profession'], cv=2)
print(f"Cross-Validation Scores: {scores}")
print(f"Rata-rata Akurasi: {scores.mean():.2f}")

# Fungsi Prediksi
def predict_profession(text):
    text = preprocess_text(text) 
    prediction = model.predict([text])
    return prediction[0]

# Kode untuk membaca input dari command-line
if __name__ == "__main__":
    # Cek apakah ada argumen input
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        predicted_profession = predict_profession(input_text)
        print(predicted_profession) 
    else:
        print("No input provided!")
