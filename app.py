from flask import Flask, render_template, request, jsonify
import math
import re

app = Flask(__name__)

# -------------------------------
# Common Weak Passwords
# -------------------------------

COMMON_PASSWORDS = {
    "123456",
    "123456789",
    "password",
    "password123",
    "admin",
    "qwerty",
    "welcome",
    "abc123",
    "letmein",
    "iloveyou",
    "monkey",
    "football"
}


# -------------------------------
# Calculate Entropy
# -------------------------------

def calculate_entropy(password):

    charset = 0

    if any(c.islower() for c in password):
        charset += 26

    if any(c.isupper() for c in password):
        charset += 26

    if any(c.isdigit() for c in password):
        charset += 10

    if any(not c.isalnum() for c in password):
        charset += 32

    if charset == 0:
        return 0

    entropy = len(password) * math.log2(charset)

    return round(entropy, 2)


# -------------------------------
# Crack Time Estimation
# -------------------------------

def estimate_crack_time(entropy):

    guesses = 2 ** entropy

    guesses_per_second = 1_000_000_000

    seconds = guesses / guesses_per_second

    if seconds < 60:
        return "Less than a minute"

    elif seconds < 3600:
        return f"{int(seconds/60)} minutes"

    elif seconds < 86400:
        return f"{int(seconds/3600)} hours"

    elif seconds < 31536000:
        return f"{int(seconds/86400)} days"

    elif seconds < 3153600000:
        return f"{int(seconds/31536000)} years"

    else:
        return "Millions of years"


# -------------------------------
# Sequential Password Check
# -------------------------------

def has_sequence(password):

    sequences = [
        "1234567890",
        "abcdefghijklmnopqrstuvwxyz",
        "qwertyuiop"
    ]

    password = password.lower()

    for seq in sequences:

        for i in range(len(seq)-2):

            if seq[i:i+3] in password:
                return True

    return False


# -------------------------------
# Repeated Characters
# -------------------------------

def repeated_characters(password):

    return re.search(r"(.)\1{2,}", password) is not None


# -------------------------------
# Password Analysis
# -------------------------------

def analyze_password(password):

    result = {}

    suggestions = []

    if password != password.strip():

        return {

            "strength": "Invalid",

            "score": 0,

            "entropy": 0,

            "crack_time": "-",

            "message": "Remove spaces from beginning/end.",

            "suggestions": [
                "Do not use leading or trailing spaces."
            ]
        }

    if " " in password:

        return {

            "strength": "Invalid",

            "score": 0,

            "entropy": 0,

            "crack_time": "-",

            "message": "Spaces are not allowed.",

            "suggestions": [
                "Use @ # $ % instead of spaces."
            ]
        }

    length = len(password)

    upper = any(c.isupper() for c in password)

    lower = any(c.islower() for c in password)

    digit = any(c.isdigit() for c in password)

    symbol = any(not c.isalnum() for c in password)

    score = 0

    if length >= 8:
        score += 20

    if length >= 12:
        score += 10

    if upper:
        score += 15

    if lower:
        score += 15

    if digit:
        score += 20

    if symbol:
        score += 20

    if password.lower() in COMMON_PASSWORDS:
        score -= 40
        suggestions.append("Avoid commonly used passwords.")

    if has_sequence(password):
        score -= 15
        suggestions.append("Avoid sequential characters.")

    if repeated_characters(password):
        score -= 15
        suggestions.append("Avoid repeated characters like aaa or 111.")

    score = max(0, min(score, 100))

    entropy = calculate_entropy(password)

    crack_time = estimate_crack_time(entropy)

    if length < 8:
        suggestions.append("Use at least 8 characters.")

    if not upper:
        suggestions.append("Add an uppercase letter.")

    if not lower:
        suggestions.append("Add a lowercase letter.")

    if not digit:
        suggestions.append("Add a number.")

    if not symbol:
        suggestions.append("Add a special symbol.")

    if score < 20:

        strength = "Very Weak"

    elif score < 40:

        strength = "Weak"

    elif score < 60:

        strength = "Medium"

    elif score < 80:

        strength = "Strong"

    else:

        strength = "Very Strong"

    result["strength"] = strength
    result["score"] = score
    result["entropy"] = entropy
    result["crack_time"] = crack_time
    result["length"] = length
    result["uppercase"] = upper
    result["lowercase"] = lower
    result["number"] = digit
    result["symbol"] = symbol
    result["suggestions"] = suggestions

    return result


# -------------------------------
# Routes
# -------------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check():

    data = request.get_json()

    password = data.get("password", "")

    result = analyze_password(password)

    return jsonify(result)


# -------------------------------
# Run App
# -------------------------------

if __name__ == "__main__":
    app.run(debug=True)