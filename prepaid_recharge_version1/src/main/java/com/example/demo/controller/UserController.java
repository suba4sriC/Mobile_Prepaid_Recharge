package com.example.demo.controller;

import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PrepaidUser;
import com.example.demo.service.UserService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/auth/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('SUBSCRIBER')")
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String phoneNumber) {
        Optional<PrepaidUser> user = userService.findByPhoneNumber(phoneNumber);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("User not found");
        }
    }


    @PreAuthorize("hasAuthority('SUBSCRIBER')")
    @PutMapping("/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody PrepaidUser updatedUser) {
        boolean updated = userService.updateUserDetails(updatedUser);
        if (updated) {
            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update profile");
        }
    }
    
    @PreAuthorize("hasAuthority('SUBSCRIBER')")
    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails(@RequestParam String phoneNumber) {
        Optional<PrepaidUser> user = userService.findByPhoneNumber(phoneNumber);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for phone number: " + phoneNumber);
        }
    }
    
    @PreAuthorize("hasAuthority('SUBSCRIBER')")
    @GetMapping("/getUserIdByPhone/{phoneNumber}")
    public ResponseEntity<?> getUserIdByPhone(@PathVariable String phoneNumber) {
        Optional<PrepaidUser> user = userService.findByPhoneNumber(phoneNumber);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getUserId());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with phone number: " + phoneNumber);
        }
    }
    
    @PreAuthorize("hasAuthority('SUBSCRIBER')")
    @GetMapping("/get-email/{userId}")
    public ResponseEntity<?> getEmailByUserId(@PathVariable String userId) {
        String email = userService.getEmailByUserId(userId);
        if (email != null) {
            return ResponseEntity.ok(Map.of("email", email));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found for userId: " + userId);
        }
    }

}

