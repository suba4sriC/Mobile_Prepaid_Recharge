package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.EmailService;

import jakarta.mail.MessagingException;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("auth/user/api/payment")
public class PaymentController {

    @Autowired
    private EmailService emailService;

    @PreAuthorize("hasAuthority('SUBSCRIBER')")
    @PostMapping("/send-email")
    public String sendEmail(@RequestBody Map<String, String> transactionDetails) {
        String userEmail = transactionDetails.get("email");
        String paymentId = transactionDetails.get("paymentId");
        String planName = transactionDetails.get("planName");
        String amount = transactionDetails.get("amount");
        String validity = transactionDetails.get("validity");
        String data = transactionDetails.get("data");
        String talktime = transactionDetails.get("talktime");
        String sms = transactionDetails.get("sms");
        String dateTime = transactionDetails.get("dateTime");

        String subject = "Payment Confirmation - Your Transaction is Successful!";
        String body = "<h3>Dear User,</h3>" +
                "<p>Your payment has been successfully processed. Below are the details:</p>" +
                "<p><strong>Payment ID:</strong> " + paymentId + "</p>" +
                "<p><strong>Plan Name:</strong> " + planName + "</p>" +
                "<p><strong>Amount Paid:</strong> ₹" + amount + "</p>" +
                "<p><strong>Validity:</strong> " + validity + "</p>" +
                "<p><strong>Data:</strong> " + data + "</p>" +
                "<p><strong>Talktime:</strong> " + talktime + "</p>" +
                "<p><strong>SMS:</strong> " + sms + "</p>" +
                "<p><strong>Transaction Date & Time:</strong> " + dateTime + "</p>" +
                "<br><p>Thank you for choosing our service!</p>";

        try {
            emailService.sendPaymentConfirmation(userEmail, subject, body);
            return "Payment confirmation email sent successfully!";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error sending email.";
        }
    }
}
