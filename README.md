# 🛡️ Password Strength Checker

A modern Password Strength Checker Web Application built using Python (Flask), HTML, CSS, and JavaScript. This application analyzes password strength in real time and provides users with security recommendations to create stronger passwords.

---

## 📌 Project Overview

Weak passwords are one of the biggest causes of cybersecurity breaches. This project helps users evaluate the strength of their passwords using multiple security checks and provides suggestions to improve them.

The application features a modern cybersecurity-themed user interface with real-time password analysis, making it both educational and practical.

---

## 🚀 Features

### ✅ Password Strength Analysis
- Detects password strength in real time.
- Categorizes passwords as:
  - 🔴 Very Weak
  - 🟠 Weak
  - 🟡 Medium
  - 🟢 Strong
  - 🟢 Very Strong

---

### 🔢 Password Length Validation
Checks whether the password contains at least **8 characters**.

---

### 🔠 Character Type Detection
Verifies the presence of:

- ✅ Uppercase letters
- ✅ Lowercase letters
- ✅ Numbers
- ✅ Special characters

---

### 🚫 Space Detection

Detects and rejects:

- Leading spaces
- Trailing spaces
- Spaces anywhere inside the password

Example:

❌ `Hello 123`

✅ `Hello@123`

---

### ⚠ Common Password Detection

Detects weak passwords such as:

- password
- password123
- 123456
- admin
- qwerty
- abc123

and warns the user to choose a stronger password.

---

### 🔁 Sequential Character Detection

Detects sequential patterns such as:

- 123456
- abcdef
- qwerty

These patterns reduce password security.

---

### 🔄 Repeated Character Detection

Detects repeated characters like:

- aaaaaaa
- 111111
- $$$$$$

and recommends creating more random passwords.

---

### 📊 Security Score

Calculates an overall password score from **0–100%** based on multiple security factors.

---

### 📈 Password Strength Meter

Displays an animated progress bar showing password strength visually.

---

### 🔥 Password Entropy

Calculates password entropy (in bits), which estimates the randomness of a password.

Higher entropy means better security.

---

### ⏳ Estimated Crack Time

Estimates how long it would take to crack the password using brute-force attacks.

Examples:

- Less than a minute
- Several hours
- Several days
- Several years
- Millions of years

---

### 💡 Security Suggestions

Provides recommendations such as:

- Add uppercase letters
- Add lowercase letters
- Add numbers
- Add special symbols
- Increase password length
- Avoid common passwords
- Avoid repeated characters
- Avoid sequential characters

---

### 👁 Show / Hide Password

Allows users to toggle password visibility using the eye icon.

---

### 🔢 Character Counter

Displays the current number of characters entered.

---

### ✅ Live Requirement Checklist

Shows which password requirements are currently satisfied.

---

### 🎨 Modern User Interface

Includes:

- Glassmorphism design
- Dark cybersecurity theme
- Neon glow effects
- Responsive layout
- Smooth animations

---

### 📱 Responsive Design

Works on:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🛠 Technologies Used

### Backend

- Python
- Flask

### Frontend

- HTML5
- CSS3
- JavaScript

### Libraries

- Flask
- Font Awesome
- Google Fonts (Poppins)

---

## 📂 Project Structure

```
Password_Strength_Checker/

│
├── app.py
├── requirements.txt
├── README.md
│
├── templates/
│     └── index.html
│
├── static/
│     ├── style.css
│     ├── script.js
│
└── screenshots/
```

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/password-strength-checker.git
```

Go inside the project

```bash
cd password-strength-checker
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
python app.py
```

Open your browser

```
http://127.0.0.1:5000
```

---

## 📊 Password Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Minimum 8 Characters | ✅ |
| Uppercase Letter | ✅ |
| Lowercase Letter | ✅ |
| Number | ✅ |
| Special Character | ✅ |
| Not a Common Password | ✅ |
| No Sequential Characters | ✅ |
| No Repeated Characters | ✅ |
| No Spaces | ✅ |

---

## 🎯 Example

Password:

```
Hello@123
```

Output:

```
Strength:
Very Strong

Security Score:
95%

Entropy:
78 bits

Estimated Crack Time:
Millions of years

Suggestions:
Excellent! Your password follows recommended security practices.
```

---

## 🎓 Learning Outcomes

This project demonstrates knowledge of:

- Password security principles
- Password validation techniques
- Flask web development
- Frontend and backend integration
- API communication using Fetch API
- JavaScript DOM manipulation
- Responsive web design
- Cybersecurity best practices

---

## 🔮 Future Improvements

Possible future enhancements include:

- Password Generator
- Password History
- Dark/Light Theme Switch
- Copy Password Button
- Export Report as PDF
- Multi-language Support
- User Authentication
- Password Breach Detection using Have I Been Pwned API
- Database Integration
- User Accounts

---

## 👨‍💻 Developed By

Khadeeja Anjum

---

## 📜 License

This project is intended for educational and internship purposes.

Feel free to modify and improve it for learning.