package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PrepaidPlan {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int planId;
	    private String planName;
	    private double planPrice;
	    private String planValidity;
	    private String planData;
	    private String planTalktime;
	    private String planSms;
	    
	    @ManyToOne
	    @JoinColumn(name = "category_id", nullable = false)
	    private PrepaidPlanCategory category;
	    
}
