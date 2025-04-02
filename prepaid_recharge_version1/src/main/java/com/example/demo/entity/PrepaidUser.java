package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PrepaidUser {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int userId;

	    @Column(nullable = false)
	    private String phoneNumber;
	    private String userName;

	    @Column(length = 100)
	    private String userEmail;

	    private String userAddress;
	    private String userPassword;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Role role;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Status status;
	    
	    public enum Role {
	        ADMIN, SUBSCRIBER
	    }

	    public enum Status {
	        ACTIVE, INACTIVE
	    }

}
