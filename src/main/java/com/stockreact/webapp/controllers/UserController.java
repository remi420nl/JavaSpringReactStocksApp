package com.stockreact.webapp.controllers;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.exception.BadCredentialsException;
import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.AuthenticationRequest;
import com.stockreact.webapp.model.AuthenticationResponse;

import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;

import com.stockreact.webapp.service.UserService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {

	//http endpoints for the User / UserDetails entity, all private fields use constructor injection rather than Autowiring
	
	private AuthenticationManager authManager;
	private UserDetailsService userDetailsService;
	private JwtUtil jwtUtil;
	private UserService userService;

	//returning the username of the logged in user
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/user")
	@ResponseBody
	public String getUser(Authentication authentication) {

		return authentication.getName();
	}

	//returns the user entity
	@GetMapping("/userdetails")
	@ResponseBody
	public ResponseEntity<?> getUserDetails(Authentication authentication) {

		User details = (User) authentication.getPrincipal();

		return ResponseEntity.ok(details);
	}

	//login method which accepts a authentication request object
	@PostMapping("/authenticate")
	public ResponseEntity<?> Authenticate(@RequestBody AuthenticationRequest request) throws StockAppException {

		UsernamePasswordAuthenticationToken token = null;

		try {
			token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

			authManager.authenticate(token);

		} catch (BadCredentialsException e) {
			// wrong password entered
			throw new BadCredentialsException();
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

		User user = (User) userDetails;

		final String jwt = jwtUtil.generateToken(userDetails);

		// creates a response using the jwt token for the json return body
		AuthenticationResponse response = new AuthenticationResponse(jwt, user.getId());

		return ResponseEntity.ok(response);
	}

	// to register a new user using a DTO object
	@PostMapping("/register")
	public ResponseEntity<User> register(@Valid @RequestBody UserDTO userDTO) throws StockAppException {

		User user = userService.registerUser(userDTO);

		return ResponseEntity.ok(user);
	}

	// get the user dto, to be able to let the user update its record
	@GetMapping("/user/{id}")
	public UserDTO getUser(@PathVariable Long id) {
		UserDTO userDto = userService.getById(id);

		return userDto;
	}

	// this is in addition to the method above for when the user has made an update
	// call, it only accepts a valid object
	@PostMapping("/user/{id}")
	public UserDTO updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDto) {

		return userService.updateUser(id, userDto);
	}
}
