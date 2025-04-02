package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPaymentConfirmation(String toEmail, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setFrom("subachandrasekar04@gmail.com");  // Sender's email
        helper.setTo(toEmail); 
        helper.setSubject(subject);
        helper.setText(body, true); // true enables HTML content

        mailSender.send(message);
        System.out.println("Email sent successfully!");
    }
}
