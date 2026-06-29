// ===============================
// Get HTML Elements
// ===============================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const meterFill = document.getElementById("meterFill");
const strengthText = document.getElementById("strengthText");

const charCount = document.getElementById("charCount");

const scoreValue = document.getElementById("scoreValue");
const entropyValue = document.getElementById("entropyValue");
const crackTime = document.getElementById("crackTime");

const suggestions = document.getElementById("suggestions");

// Checklist

const lengthCheck = document.getElementById("lengthCheck");
const upperCheck = document.getElementById("upperCheck");
const lowerCheck = document.getElementById("lowerCheck");
const numberCheck = document.getElementById("numberCheck");
const symbolCheck = document.getElementById("symbolCheck");


// ========================================
// Show / Hide Password
// ========================================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    }

    else {

        passwordInput.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});


// ========================================
// Listen While Typing
// ========================================

passwordInput.addEventListener("input", async () => {

    const password = passwordInput.value;

    charCount.innerText = password.length;

    if (password.length === 0) {

        resetUI();

        return;

    }

    try {

        const response = await fetch("/check", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                password: password

            })

        });

        const data = await response.json();

        updateUI(data);

    }

    catch (error) {

        console.error(error);

    }

});


// ========================================
// Update UI
// ========================================

function updateUI(data) {

    //-----------------------------
    // Strength Text
    //-----------------------------

    strengthText.innerHTML =
        "<strong>" + data.strength + "</strong>";



    //-----------------------------
    // Score
    //-----------------------------

    scoreValue.innerText =
        data.score + "%";



    //-----------------------------
    // Entropy
    //-----------------------------

    entropyValue.innerText =
        data.entropy;



    //-----------------------------
    // Crack Time
    //-----------------------------

    crackTime.innerText =
        data.crack_time;



    //-----------------------------
    // Progress Bar
    //-----------------------------

    meterFill.style.width =
        data.score + "%";



    //-----------------------------
    // Meter Colors
    //-----------------------------

    switch (data.strength) {

        case "Very Weak":

            meterFill.style.background =
                "#dc2626";

            strengthText.style.color =
                "#dc2626";

            break;

        case "Weak":

            meterFill.style.background =
                "#ef4444";

            strengthText.style.color =
                "#ef4444";

            break;

        case "Medium":

            meterFill.style.background =
                "#facc15";

            strengthText.style.color =
                "#facc15";

            break;

        case "Strong":

            meterFill.style.background =
                "#22c55e";

            strengthText.style.color =
                "#22c55e";

            break;

        case "Very Strong":

            meterFill.style.background =
                "#16a34a";

            strengthText.style.color =
                "#16a34a";

            break;

        default:

            meterFill.style.background =
                "#64748b";

            strengthText.style.color =
                "#ffffff";

    }



    //-----------------------------
    // Checklist
    //-----------------------------

    updateCheck(

        lengthCheck,

        data.length >= 8,

        "Minimum 8 Characters"

    );



    updateCheck(

        upperCheck,

        data.uppercase,

        "Uppercase Letter"

    );



    updateCheck(

        lowerCheck,

        data.lowercase,

        "Lowercase Letter"

    );



    updateCheck(

        numberCheck,

        data.number,

        "Number"

    );



    updateCheck(

        symbolCheck,

        data.symbol,

        "Special Symbol"

    );



    //-----------------------------
    // Suggestions
    //-----------------------------

    suggestions.innerHTML = "";



    if (data.message) {

        let li = document.createElement("li");

        li.innerHTML =
            "⚠ " + data.message;

        suggestions.appendChild(li);

    }



    if (data.suggestions.length > 0) {

        data.suggestions.forEach(item => {

            let li = document.createElement("li");

            li.innerHTML =
                "• " + item;

            suggestions.appendChild(li);

        });

    }



    if (

        data.suggestions.length === 0 &&

        data.strength === "Very Strong"

    ) {

        let li = document.createElement("li");

        li.innerHTML =
            "✅ Excellent! Your password follows all recommended security practices.";

        suggestions.appendChild(li);

    }

}



// ========================================
// Checklist Helper
// ========================================

function updateCheck(element, status, text) {

    if (status) {

        element.innerHTML =
            "✅ " + text;

        element.style.color =
            "#22c55e";

    }

    else {

        element.innerHTML =
            "❌ " + text;

        element.style.color =
            "#ef4444";

    }

}



// ========================================
// Reset UI
// ========================================

function resetUI() {

    meterFill.style.width = "0%";

    meterFill.style.background = "#64748b";

    strengthText.innerHTML =
        "Waiting for password...";

    strengthText.style.color =
        "#ffffff";

    scoreValue.innerText = "0%";

    entropyValue.innerText = "0";

    crackTime.innerText = "-";

    suggestions.innerHTML =
        "<li>Start typing to analyze your password...</li>";



    updateCheck(lengthCheck, false, "Minimum 8 Characters");

    updateCheck(upperCheck, false, "Uppercase Letter");

    updateCheck(lowerCheck, false, "Lowercase Letter");

    updateCheck(numberCheck, false, "Number");

    updateCheck(symbolCheck, false, "Special Symbol");

}