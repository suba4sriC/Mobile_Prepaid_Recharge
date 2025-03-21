package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PrepaidPlanCategory {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int categoryId;
	    private String categoryName;

	    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	    @JsonIgnore
	    private List<PrepaidPlan> prepaidPlans;
}
