package com.stockreact.webapp.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.AuthenticationRequest;
import com.stockreact.webapp.model.AuthenticationResponse;

import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;

import com.stockreact.webapp.service.UserService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor 
@RequestMapping("/api")
public class UserController {

	
	private final AuthenticationManager authManager;
	
	private final UserDetailsService userDetailsService;

	private final JwtUtil jwtUtil;
	
	private final UserService userService;
	
	@GetMapping({"/test"})
	public String  Login() {
		System.out.println("Login method");
		return "home";
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/user")
	@ResponseBody
    public String getUser(Authentication authentication) {
		System.out.println("getuser called");
		
        return authentication.getName();
    }
	
	@GetMapping("/userdetails")
	@ResponseBody
    public ResponseEntity<?> getUserDetails(Authentication authentication){
		
        User details =  (User) authentication.getPrincipal();
       
        return ResponseEntity.ok(details);
    }
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<?>  Authenticate(@RequestBody AuthenticationRequest request) throws StockAppException {
		System.out.println("Authenticate method");
		
		UsernamePasswordAuthenticationToken token;
		
		try {
			token = new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword());
			
			authManager.authenticate(token);
		} catch (BadCredentialsException e) {
			
			e.printStackTrace();
			throw new StockAppException("Incorrent username or password");}
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
		
		final String jwt = jwtUtil.generateToken(userDetails);
		
		//creates a response using the jwt token for the json return body
		AuthenticationResponse response = new AuthenticationResponse(jwt);
	
		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	public ResponseEntity<?>  register (@Valid @RequestBody UserDTO userDTO) throws StockAppException {
		System.out.println("Registeruser called: "+ userService.testmethod());

		User user = userService.registerUser(userDTO);
		
		
		return ResponseEntity.ok(user);
	} 
	
}
