package com.example.demo.service;

import com.example.demo.entity.PrepaidUser;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public PrepaidUser saveUser(PrepaidUser user) {
        return userRepository.save(user);
    }

    public Optional<PrepaidUser> findByPhoneNumber(String phoneNumber) {
    	return Optional.ofNullable(userRepository.findByPhoneNumber(phoneNumber).orElse(null));
    }

    public boolean isPhoneNumberExists(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }
    
    public Optional<PrepaidUser> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    
    public boolean updateUserDetails(PrepaidUser updatedUser) {
        Optional<PrepaidUser> existingUser = userRepository.findByPhoneNumber(updatedUser.getPhoneNumber());

        if (existingUser.isPresent()) {
            PrepaidUser user = existingUser.get();
            user.setUserEmail(updatedUser.getUserEmail());
            user.setUserAddress(updatedUser.getUserAddress());
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
