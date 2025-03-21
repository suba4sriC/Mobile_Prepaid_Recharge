package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.PrepaidPlan;
import com.example.demo.entity.PrepaidPlanCategory;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.PrepaidPlanService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth/api/prepaidplan")
@CrossOrigin("*")
public class PlanController {

    @Autowired
    private PrepaidPlanService prepaidPlanService;
    
    @Autowired
    private CategoryRepository categoryRepo;

    @GetMapping
    public ResponseEntity<List<PrepaidPlan>> getAllPlans() {
        List<PrepaidPlan> plans = prepaidPlanService.getAllPlans();
        return (plans != null && !plans.isEmpty())
            ? ResponseEntity.ok(plans)
            : ResponseEntity.noContent().build(); 
    }
    
    @GetMapping("/{planId}")
    public ResponseEntity<?> getPlanById(@PathVariable int planId) {
        try {
            PrepaidPlan plan = prepaidPlanService.getPlanById(planId);
            return ResponseEntity.ok(plan); 
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage()); 
        }
    }


    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> addPlan(@RequestBody PrepaidPlan plan, @RequestParam int categoryId) {
        prepaidPlanService.addPlan(plan, categoryId);
        return ResponseEntity.ok("Plan added successfully!");
    }
    
    @PutMapping("/{planId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updatePlan(
            @PathVariable int planId,
            @RequestBody PrepaidPlan updatedPlan,
            @RequestParam int categoryId) {

        boolean isUpdated = prepaidPlanService.updatePlan(planId, updatedPlan, categoryId);
        return isUpdated
            ? ResponseEntity.ok("Plan updated successfully!")
            : ResponseEntity.status(404).body("Plan not found");
    }
    
    @DeleteMapping("/{planId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deletePlan(@PathVariable int planId) {
        boolean isDeleted = prepaidPlanService.deletePlan(planId);
        return isDeleted
            ? ResponseEntity.ok("Plan deleted successfully!") 
            : ResponseEntity.status(404).body("Plan not found!");
    }

    @GetMapping("/category")
    public ResponseEntity<List<PrepaidPlanCategory>> getAllCategory(){
        return ResponseEntity.ok(categoryRepo.findAll());
    }
}
