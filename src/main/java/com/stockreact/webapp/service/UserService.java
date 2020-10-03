package com.stockreact.webapp.service;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	private UserRepository userRepo;
	
	
	public User registerUser(UserDTO userDto) {
		
		User user = mapToUser(userDto);
		
		userRepo.save(user);
		
		return user;
	}
	
	private User mapToUser(UserDTO userDto) {
		
		return
		User.builder().username(userDto.getUsername()).firstname(userDto.getFirstname()).lastname(userDto.getLastname())
		.email(userDto.getEmail()).city(userDto.getCity()).password(userDto.getPassword()).build();
		
	}

	
	

}
