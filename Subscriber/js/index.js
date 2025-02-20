let generatedOTP;

function sendOTP() {
    let mobile = document.getElementById("mobile").value;
    let mobileError = document.getElementById("mobile-error");
    let pattern = /^\d{10}$/;

    if (pattern.test(mobile)) {
        generatedOTP = Math.floor(1000 + Math.random() * 9000);
        mobileError.textContent = ""; 

        document.getElementById("otp-display").textContent = "Your OTP is: " + generatedOTP;

        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    } else {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
    }
}

function verifyOTP() {
    let enteredOTP = document.getElementById("otp").value;
    let otpError = document.getElementById("otp-error");
    if (enteredOTP == generatedOTP) {
        otpError.textContent = "";
        window.location.href = "home.html";
    } else {
        otpError.textContent = "Invalid OTP. Try Again!";
    }
}