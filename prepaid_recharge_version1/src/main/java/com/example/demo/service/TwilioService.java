package com.example.demo.service;

import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    public void sendSms(String to, String otp) {
        try {
            Twilio.init(accountSid, authToken);

            Message.creator(
                new com.twilio.type.PhoneNumber("+91" + to), 
                new com.twilio.type.PhoneNumber(twilioPhoneNumber), 
                "Your OTP for login is: " + otp + ". Please do not share this OTP."
            ).create();

            System.out.println("✅ OTP Sent Successfully to: " + to);

        } catch (ApiException e) {
            System.err.println("Error sending OTP: " + e.getMessage());
            throw new RuntimeException("Failed to send OTP. Please check Twilio settings.");
        } catch (Exception e) {
            System.err.println("Unexpected Error: " + e.getMessage());
            throw new RuntimeException(" Unexpected error occurred.");
        }
    }
}
