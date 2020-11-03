package com.stockreact.webapp.controllers;

import java.security.Principal;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.exception.BadCredentialsException;
import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.exception.UserNotFoundException;
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
@RequestMapping("/api")
public class UserController {

	@Autowired
	private  AuthenticationManager authManager;
	@Autowired
	private  UserDetailsService userDetailsService;
	@Autowired
	private  JwtUtil jwtUtil;
	@Autowired
	private  UserService userService;
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/user")
	@ResponseBody
    public String getUser(Authentication authentication) {
		
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
		
	
	
		UsernamePasswordAuthenticationToken token = null;
	
		try {
			token = new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword());
	
			authManager.authenticate(token);
		
		} 	catch (BadCredentialsException e) {
			throw new BadCredentialsException();
		}
		
		
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

		System.out.println("configure" );

		
		User user = (User) userDetails;
		
		final String jwt = jwtUtil.generateToken(userDetails);
		
		//creates a response using the jwt token for the json return body
		AuthenticationResponse response = new AuthenticationResponse(jwt,user.getId());
	
		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	public ResponseEntity<User>  register (@Valid @RequestBody UserDTO userDTO) throws StockAppException {

		User user = userService.registerUser(userDTO);
		
		
		return ResponseEntity.ok(user);
	} 
	
	
	 
	@GetMapping("/user/{id}")
	 public UserDTO getUser(@PathVariable Long id) {
	        UserDTO userDto = userService.getById(id);
	        
	        return userDto;
	    
		} 
	 
	 	@PostMapping("/user/{id}")
		public UserDTO updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDto) {
		
		return userService.updateUser(id, userDto);
		
		 
		}
}
