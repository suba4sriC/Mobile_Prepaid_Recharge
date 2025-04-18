package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PrepaidPlanCategory;

@Repository
public interface CategoryRepository extends JpaRepository<PrepaidPlanCategory, Integer> {
	Optional <PrepaidPlanCategory> findBycategoryName(String categoryName);
}

