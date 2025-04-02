document.addEventListener('DOMContentLoaded', function () {
    localStorage.clear()
    let generatedOTP;
    async function sendOTP() {
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

        try {
            const response = await fetch("http://localhost:8083/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: mobile })
            });

            const data = await response.json();
            if (response.ok) {
                generatedOTP = data.otp; // Mock OTP in response (For Testing)
                mobileError.textContent = ""; 
                // document.getElementById("otp-display").textContent = "Your OTP is: " + generatedOTP;

                document.getElementById("step1").style.display = "none";
                document.getElementById("step2").style.display = "block";
            } else {
                mobileError.textContent = data.message || "Failed to send OTP. Try again.";
            }

        } catch (error) {
            mobileError.textContent = "Not a registered Swift top user.";
        }
    }

    async function verifyOTP() {
        let enteredOTP = document.getElementById("otp").value.trim();
        let otpError = document.getElementById("otp-error");

        if (enteredOTP === "") {
            otpError.textContent = "OTP is required.";
            return;
        }

        const mobileNumber = document.getElementById("mobile").value.trim();

        try {
            const response = await fetch("http://localhost:8083/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: mobileNumber,
                    otp: enteredOTP
                })
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                otpError.textContent = "";
                localStorage.setItem("jwtToken", data.token.trim()); 
                localStorage.setItem("phoneNumber",mobileNumber) // Store JWT securely
                window.location.href = `home.html`;
            } else {
                otpError.textContent = data.message || "Invalid OTP. Try again.";
            }

        } catch (error) {
            otpError.textContent = "Error verifying OTP. Please try again.";
        }
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

    document.getElementById("sendOtpBtn").addEventListener('click', sendOTP);
    document.getElementById("verifyOtpBtn").addEventListener('click', verifyOTP);
});
