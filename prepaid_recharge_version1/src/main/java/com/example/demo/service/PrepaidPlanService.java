package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PrepaidPlan;
import com.example.demo.entity.PrepaidPlanCategory;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.PrepaidPlanRepository;

@Service
public class PrepaidPlanService {
	 @Autowired
	    private PrepaidPlanRepository prepaidPlanRepository;
	 @Autowired
	    private CategoryRepository categoryRepository;

	    public List<PrepaidPlan> getAllPlans() {
	        return prepaidPlanRepository.findAll();
	    }
	    
	    public PrepaidPlan getPlanByName(String planName) {
	        return prepaidPlanRepository.findByPlanName(planName);
	    }
	    
	    public PrepaidPlan getPlanById(int planId) {
	        return prepaidPlanRepository.findById(planId)
	                .orElseThrow(() -> new RuntimeException("Prepaid plan not found with ID: " + planId));
	    }

	    
	    
	    public void addPlan(PrepaidPlan plan, int categoryId) {
	        Optional<PrepaidPlanCategory> category = categoryRepository.findById(categoryId);
	        category.ifPresent(plan::setCategory);

	        prepaidPlanRepository.save(plan);
	    }
	    
	    public boolean updatePlan(int planId, PrepaidPlan updatedPlan, int categoryId) {
	        Optional<PrepaidPlan> existingPlan = prepaidPlanRepository.findById(planId);
	        Optional<PrepaidPlanCategory> category = categoryRepository.findById(categoryId);

	        if (existingPlan.isPresent() && category.isPresent()) {
	            PrepaidPlan plan = existingPlan.get();
	            plan.setPlanName(updatedPlan.getPlanName());
	            plan.setPlanPrice(updatedPlan.getPlanPrice());
	            plan.setPlanValidity(updatedPlan.getPlanValidity());
	            plan.setPlanData(updatedPlan.getPlanData());
	            plan.setPlanTalktime(updatedPlan.getPlanTalktime());
	            plan.setPlanSms(updatedPlan.getPlanSms());
	            plan.setCategory(category.get());

	            prepaidPlanRepository.save(plan);
	            return true; 
	        }
	        return false; 
	    }
	    
	    
	    public boolean deletePlan(int planId) {
	        Optional<PrepaidPlan> existingPlan = prepaidPlanRepository.findById(planId);

	        if (existingPlan.isPresent()) {
	            prepaidPlanRepository.deleteById(planId);
	            return true;
	        }
	        return false; 
	    }
}
