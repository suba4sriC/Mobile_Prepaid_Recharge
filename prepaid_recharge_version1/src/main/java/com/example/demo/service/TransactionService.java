package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository prepaidUserRepository;

    @Autowired
    private PrepaidPlanRepository prepaidPlanRepository;

    public Transaction saveTransaction(String paymentId, int userId, int planId, double amount, String paymentStatus, LocalDateTime dateAndTime) {
        if (paymentId == null || paymentId.isEmpty()) {
            throw new IllegalArgumentException("Payment ID cannot be empty");
        }

        if (amount <= 0) {
            throw new IllegalArgumentException("Invalid amount value");
        }

        Transaction transaction = new Transaction();
        transaction.setPaymentId(paymentId);
        transaction.setPrepaidUser(prepaidUserRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
        transaction.setPrepaidPlan(prepaidPlanRepository.findById(planId).orElseThrow(() -> new IllegalArgumentException("Plan not found")));
        transaction.setAmount(amount);
        transaction.setPaymentStatus(paymentStatus);
        transaction.setDateAndTime(dateAndTime);

        return transactionRepository.save(transaction);
    }


    public Transaction getTransactionByPaymentId(String paymentId) {
        return transactionRepository.findByPaymentId(paymentId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with Payment ID: " + paymentId));
    }
}

