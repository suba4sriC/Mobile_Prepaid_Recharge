package com.example.demo.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.entity.PrepaidUser;
import com.example.demo.repository.UserRepository;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository prepaidUserRepository;
    
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/auth/send-otp") || path.startsWith("/auth/login") || path.startsWith("/auth/admin/login");
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            System.out.println("❌ No Bearer token provided");
            chain.doFilter(request, response);
            return;
        }

        token = token.substring(7);
        System.out.println("✅ Received Token: " + token);
        
        if (jwtUtil.isTokenExpired(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token.");
            return;
        }

        // Extract phone number and role from token
        String identifier = jwtUtil.extractIdentifier(token);
        String role = jwtUtil.getRoleFromToken(token);

        if (identifier == null || role == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("❌ Invalid token structure.");
            return;
        }
        
        System.out.println("🔍 Extracted Identifier: " + identifier);
        System.out.println("🔍 Extracted Role: " + role);
        
        Optional<PrepaidUser> userOptional = prepaidUserRepository.findByPhoneNumber(identifier);
        if (userOptional.isEmpty()) {
            userOptional = prepaidUserRepository.findByUserName(identifier);
        }

        if (userOptional.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("❌ User not found.");
            return;
        }
        
        if (userOptional.get().getStatus() != PrepaidUser.Status.ACTIVE) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("❌ User account is inactive.");
            return;
        }

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));
        SecurityContextHolder.getContext()
                .setAuthentication(new UsernamePasswordAuthenticationToken(identifier, null, authorities));

        System.out.println("✅ Authentication Successful! Role: " + role);

        chain.doFilter(request, response);
    }
}

