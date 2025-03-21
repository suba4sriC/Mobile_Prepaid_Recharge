package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PrepaidUser;

public interface UserRepository extends JpaRepository<PrepaidUser, Integer> {

	Optional<PrepaidUser> findByPhoneNumber(String phoneNumber);
	Optional<PrepaidUser> findByUserName(String userName);
}
