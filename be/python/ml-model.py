from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, cross_val_score
import pandas as pd
import re
import sys

data = {
    "text": [
        # Backend Developer
        "be",
        "backend",
        "back end",
        "back-end",
        "bekend",
        "backend developer",
        "full stack developer",
        "backend engineer",
        "backend systems",
        "developer perangkat lunak",
        # Software Developer
        "software developer",
        "software engineer",
        "software developer",
        "full stack developer",
        "software engineer",
        "developer",
        "software architect",
        "web developer",
        "mobile developer",
        "application developer",
        # Data Analyst
        "data analis",
        "data analysis",
        "data analyst",
        "big data analyst",
        "data engineer",
        "data scientist",
        "data transformation",
        "data extraction",
        "data visualization",
        "business analyst",
        # Data Scientist
        "data scientist",
        "data scientist",
        "machine learning engineer",
        "ai engineer",
        "big data scientist",
        "data modeling",
        "data analysis",
        "data algorithms",
        "data-driven",
        "predictive analytics",
        # Machine Learning Engineer
        "machine learning engineer",
        "ai engineer",
        "data scientist",
        "ml engineer",
        "deep learning",
        "neural networks",
        "ai development",
        "predictive modeling",
        "data mining",
        "data engineer",
        # Cloud Engineer
        "cloud engineer",
        "cloud architect",
        "cloud computing",
        "aws engineer",
        "azure engineer",
        "google cloud engineer",
        "cloud infrastructure",
        "cloud platform",
        "cloud solutions",
        "cloud systems",
        # DevOps Engineer
        "devops",
        "devops engineer",
        "ci/cd engineer",
        "automation engineer",
        "infrastructure engineer",
        "cloud devops",
        "cloud infrastructure",
        "sysadmin",
        "site reliability engineer",
        "build engineer",
        # UX Designer
        "ux designer",
        "ux research",
        "user experience designer",
        "product designer",
        "interaction designer",
        "ui/ux designer",
        "user interface designer",
        "visual designer",
        "ux researcher",
        "service designer",
        # UI Designer
        "ui designer",
        "user interface designer",
        "ux/ui designer",
        "ui/ux designer",
        "visual designer",
        "graphic designer",
        "product designer",
        "web designer",
        "mobile ui designer",
        "digital designer",
        # Product Manager
        "product manager",
        "product owner",
        "product lead",
        "product strategist",
        "agile product manager",
        "product lifecycle",
        "product roadmap",
        "product development",
        "software product manager",
        "tech lead",
        # Tech Lead
        "tech lead",
        "lead developer",
        "engineering lead",
        "team lead",
        "technical manager",
        "software lead",
        "lead software engineer",
        "system lead",
        "senior developer",
        "lead engineer",
        # Software Architect
        "software architect",
        "systems architect",
        "enterprise architect",
        "solution architect",
        "cloud architect",
        "technical architect",
        "enterprise software architect",
        "software systems architect",
        "tech architect",
        "full stack architect",
        # Web Developer
        "web developer",
        "frontend developer",
        "full stack developer",
        "backend developer",
        "web application developer",
        "frontend engineer",
        "html/css developer",
        "javascript developer",
        "web programmer",
        "web solutions architect",
        # Mobile Developer
        "mobile developer",
        "android developer",
        "ios developer",
        "mobile app developer",
        "aplikasi",
        "native app developer",
        "react native developer",
        "flutter developer",
        "mobile software engineer",
        "mobile programming",
        # iOS Developer
        "ios developer",
        "iphone developer",
        "swift developer",
        "ios app developer",
        "mobile developer",
        "objective-c developer",
        "ios engineer",
        "mobile app developer",
        "ios programmer",
        "ios development",
        # Android Developer
        "android developer",
        "android app developer",
        "android engineer",
        "mobile developer",
        "android software developer",
        "java android developer",
        "kotlin android developer",
        "android applications",
        "android studio developer",
        "android programmer",
        # Cybersecurity Expert
        "cybersecurity expert",
        "security engineer",
        "information security",
        "penetration tester",
        "ethical hacker",
        "network security engineer",
        "cybersecurity consultant",
        "security analyst",
        "security architect",
        "incident responder",
        # IT Specialist
        "it specialist",
        "it consultant",
        "it manager",
        "systems administrator",
        "network administrator",
        "technical support",
        "it technician",
        "help desk technician",
        "systems engineer",
        "it support specialist",
        # Network Engineer
        "network engineer",
        "network administrator",
        "systems engineer",
        "network architect",
        "network specialist",
        "network security",
        "network infrastructure",
        "ccna engineer",
        "network operations",
        "it network engineer",
        # Cloud Architect
        "cloud architect",
        "cloud engineer",
        "cloud computing architect",
        "cloud infrastructure architect",
        "aws architect",
        "azure architect",
        "gcp cloud architect",
        "cloud solutions architect",
        "enterprise cloud architect",
        "cloud systems architect",
        # QA Engineer
        "qa engineer",
        "quality assurance engineer",
        "software tester",
        "manual tester",
        "automation tester",
        "qa analyst",
        "test engineer",
        "qa automation",
        "software tester",
        "testing engineer",
        # Game Developer
        "game developer",
        "unity developer",
        "unreal engine developer",
        "game programmer",
        "game designer",
        "video game developer",
        "game engine developer",
        "3d game developer",
        "game development",
        "indie game developer",
        # System Administrator
        "system administrator",
        "sysadmin",
        "network administrator",
        "server administrator",
        "linux administrator",
        "windows administrator",
        "systems engineer",
        "it administrator",
        "data center administrator",
        "cloud administrator",
        # Database Administrator
        "database administrator",
        "db admin",
        "sql database administrator",
        "oracle dba",
        "database systems",
        "database developer",
        "sql server administrator",
        "data warehouse admin",
        "dbms administrator",
        "cloud database administrator",
        # Virtualization Specialist
        "virtualization specialist",
        "vmware specialist",
        "virtualization engineer",
        "cloud virtualization",
        "virtualization architect",
        "virtualization consultant",
        "virtual machine expert",
        "hypervisor expert",
        "virtualization manager",
        "vmware administrator",
        # IT Consultant
        "it consultant",
        "technology consultant",
        "it advisory",
        "business technology consultant",
        "cloud consultant",
        "cybersecurity consultant",
        "digital transformation consultant",
        "consulting engineer",
        "it solutions consultant",
        "enterprise consultant",
        # Business Analyst
        "business analyst",
        "business systems analyst",
        "requirements analyst",
        "data analyst",
        "financial analyst",
        "business intelligence analyst",
        "product analyst",
        "it business analyst",
        "process analyst",
        "project analyst",
        # Digital Marketing Expert
        "digital marketing expert",
        "online marketing",
        "seo specialist",
        "content strategist",
        "social media marketer",
        "email marketing specialist",
        "search engine marketing",
        "digital media strategist",
        "digital advertising expert",
        "performance marketing",
        # Digital Transformation Consultant
        "digital transformation consultant",
        "technology consultant",
        "digital strategy consultant",
        "business transformation consultant",
        "cloud transformation consultant",
        "enterprise transformation consultant",
        "innovation consultant",
        "it transformation consultant",
        "business consultant",
        "digital change expert",
        # IT Manager
        "it manager",
        "it director",
        "technical manager",
        "network manager",
        "systems manager",
        "head of it",
        "it team leader",
        "it infrastructure manager",
        "technology manager",
        "digital transformation manager",
        # Infrastructure Engineer
        "infrastructure engineer",
        "network engineer",
        "cloud infrastructure engineer",
        "system engineer",
        "data center engineer",
        "cloud architect",
        "it infrastructure engineer",
        "devops engineer",
        "infrastructure architect",
        "it systems engineer",
    ],
    "profession": [
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Backend Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Software Developer",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Analyst",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Data Scientist",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Machine Learning Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "Cloud Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "DevOps Engineer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UX Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "UI Designer",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Product Manager",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Tech Lead",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Software Architect",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Web Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "Mobile Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "iOS Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Android Developer",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "Cybersecurity",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "IT Specialist",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Network Engineer",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "Cloud Architect",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "QA Engineer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "Game Developer",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "System Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Database Administrator",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "Virtualization Specialist",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "IT Consultant",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Business Analyst",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Marketing Expert",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "Digital Transformation Consultant",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "IT Manager",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
        "Infrastructure Engineer",
    ],
}

# processing Teks
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    return text


# Preprocessing DataFrame
df = pd.DataFrame(data)
df["text"] = df["text"].apply(preprocess_text)  # Preprocessing teks
# print(f"data frame : {df}")

# Split Data Menjadi Training dan Testing
X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["profession"], test_size=0.3, random_state=42
)

# Pipeline Model
model = Pipeline(
    [
        ("vectorizer", TfidfVectorizer()),  # Mengubah teks menjadi representasi TF-IDF
        ("classifier", LogisticRegression()),  # Model klasifikasi logistic regressions
    ]
)

# Training Model
model.fit(X_train, y_train)

# Evaluasi Model
score = model.score(X_test, y_test)
print(f"Akurasi Model (Test Set): {score:.2f}")

# Jika ingin menggunakan cross-validation dengan jumlah fold lebih sedikit (misalnya 3)
scores = cross_val_score(model, df["text"], df["profession"], cv=5)
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
