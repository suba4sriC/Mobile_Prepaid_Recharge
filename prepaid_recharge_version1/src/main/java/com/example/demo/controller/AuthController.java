package com.example.demo.controller;

import com.example.demo.entity.PrepaidUser;
import com.example.demo.entity.PrepaidUser.Status;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.TwilioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository prepaidUserRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private TwilioService twilioService;

    private final Map<String, String> otpStorage = new HashMap<>(); // Temporary OTP storage

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        Optional<PrepaidUser> userOptional = prepaidUserRepository.findByPhoneNumber(phoneNumber);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body(" User not found.");
        }

        String generatedOtp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStorage.put(phoneNumber, generatedOtp);
        System.out.println(generatedOtp);
        try {
//            twilioService.sendSms(phoneNumber, generatedOtp);
            return ResponseEntity.ok(Map.of(
                "message", "✅ OTP sent successfully.",
                "otp", generatedOtp 
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send OTP. Please try again.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginWithOtp(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String otp = request.get("otp");

        if (!otpStorage.containsKey(phoneNumber) || !otpStorage.get(phoneNumber).equals(otp)) {
            return ResponseEntity.status(401).body("Invalid OTP.");
        }

        Optional<PrepaidUser> userOptional = prepaidUserRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        PrepaidUser user = userOptional.get();
        if (user.getStatus() != Status.ACTIVE) {
            return ResponseEntity.status(403).body("User account is inactive.");
        }
        String token = jwtUtil.generateToken(phoneNumber, user.getRole().name());
        otpStorage.remove(phoneNumber);

        return ResponseEntity.ok(Map.of(
                "message", "✅ Login successful!",
                "token", token,
                "role", user.getRole().name()
        ));
    }
    
    
    
    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> request) {
        String username = request.get("userName");
        String password = request.get("password");

        Optional<PrepaidUser> userOptional = prepaidUserRepository.findByUserName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        PrepaidUser user = userOptional.get();
        System.out.println("🔍 Found User: " + user.getUserName() + ", Role: " + user.getRole()); // Debugging line
        if (!user.getRole().equals(PrepaidUser.Role.ADMIN)) {
            return ResponseEntity.status(403).body("Access denied. Only admins can log in.");
        }



        String token = jwtUtil.generateToken(username, user.getRole().name());


        return ResponseEntity.ok(Map.of(
            "message", "✅ Admin login successful!",
            "token", token,
            "role", user.getRole().name()
        ));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        Optional<PrepaidUser> userOptional = prepaidUserRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        PrepaidUser user = userOptional.get();
        if (!passwordEncoder.matches(oldPassword, user.getUserPassword())) {
            return ResponseEntity.status(401).body("Old password is incorrect.");
        }

        user.setUserPassword(passwordEncoder.encode(newPassword));
        prepaidUserRepository.save(user);

        return ResponseEntity.ok("✅ Password changed successfully.");
    }
}
