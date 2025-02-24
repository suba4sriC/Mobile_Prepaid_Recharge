document.addEventListener('DOMContentLoaded', function () {
    let generatedOTP;

    function sendOTP() {
        let mobile = document.getElementById("mobile").value.trim();
        let mobileError = document.getElementById("mobile-error");
        let pattern = /^\d{10}$/;

        if (mobile === "") {
            mobileError.textContent = "Mobile number is required.";
            return;
        }

        if (!pattern.test(mobile)) {
            mobileError.textContent = "Please enter a valid 10-digit mobile number.";
            return;
        }

        generatedOTP = Math.floor(100000 + Math.random() * 900000); 
        mobileError.textContent = ""; 

        document.getElementById("otp-display").textContent = "Your OTP is: " + generatedOTP;

        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    }

    document.getElementById("mobile").addEventListener("input", function () {
        let mobile = this.value.trim();
        let mobileError = document.getElementById("mobile-error");
        let pattern = /^\d{10}$/;

        if (pattern.test(mobile)) {
            mobileError.textContent = "";
        }
    });

    document.getElementById("otp").addEventListener("input", function () {
        let enteredOTP = this.value.trim();
        let otpError = document.getElementById("otp-error");

        if (enteredOTP.length > 0) {
            otpError.textContent = ""; 
        }
    });

    function verifyOTP() {
        let enteredOTP = document.getElementById("otp").value.trim();
        let otpError = document.getElementById("otp-error");

        if (enteredOTP === "") {
            otpError.textContent = "OTP is required.";
            return;
        }

        if (enteredOTP == generatedOTP) {
            otpError.textContent = "";
            window.location.href = "home.html";
        } else {
            otpError.textContent = "Invalid OTP. Try Again!";
        }
    }

    document.querySelector('.btn-primary').addEventListener('click', sendOTP);
    document.querySelector('.btn-success').addEventListener('click', verifyOTP);
});
