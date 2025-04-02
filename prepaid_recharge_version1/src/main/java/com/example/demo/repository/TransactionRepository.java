package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PrepaidUser;
import com.example.demo.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
	List<Transaction> findByPrepaidUser(PrepaidUser prepaidUser);
	Optional<Transaction> findTopByPrepaidUserOrderByDateAndTimeDesc(PrepaidUser prepaidUser);
}
