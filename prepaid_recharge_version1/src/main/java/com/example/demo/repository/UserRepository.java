package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.PrepaidUser;

public interface UserRepository extends JpaRepository<PrepaidUser, Integer> {

	Optional<PrepaidUser> findByPhoneNumber(String phoneNumber);
	Optional<PrepaidUser> findByUserName(String userName);
	@Query("SELECT u.userEmail FROM PrepaidUser u WHERE u.userId = :userId")
    String findEmailByUserId(@Param("userId") String userId);
}
