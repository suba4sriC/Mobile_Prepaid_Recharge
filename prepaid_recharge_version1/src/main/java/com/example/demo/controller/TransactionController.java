package com.example.demo.controller;

import com.example.demo.entity.Transaction;
import com.example.demo.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth/user/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/confirm")
    public ResponseEntity<?> saveTransaction(@RequestBody Map<String, Object> request) {
        System.out.println("Received Data: " + request);  // ✅ Debugging data

        try {
            String paymentId = (String) request.get("paymentId");
            int userId = Integer.parseInt(request.get("userId").toString());
            int planId = Integer.parseInt(request.get("planId").toString());
            double amount = Double.parseDouble(request.get("amount").toString());
            String paymentStatus = (String) request.get("paymentStatus");
            LocalDateTime dateAndTime = LocalDateTime.parse(request.get("dateAndTime").toString());

            Transaction transaction = transactionService.saveTransaction(
                    paymentId, userId, planId, amount, paymentStatus, dateAndTime);

            return ResponseEntity.ok(transaction);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing payment data: " + e.getMessage());
        }
    }



    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getTransactionByPaymentId(@PathVariable String paymentId) {
        try {
            Transaction transaction = transactionService.getTransactionByPaymentId(paymentId);
            return ResponseEntity.ok(transaction);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
