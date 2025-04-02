package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    public Optional<Transaction> getLatestTransactionByUserId(int userId) {
        // Ensure you first fetch the user entity
        PrepaidUser user = prepaidUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        // Assuming the active plan is the latest transaction by dateAndTime
        return transactionRepository.findTopByPrepaidUserOrderByDateAndTimeDesc(user);
    }
    
    public List<Transaction> getTransactionsByUserId(int userId) {
        // First, fetch the user entity by userId.
        Optional<PrepaidUser> userOptional = prepaidUserRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        PrepaidUser user = userOptional.get();

        // Now, fetch transactions associated with this user.
        return transactionRepository.findByPrepaidUser(user);
    }
}

