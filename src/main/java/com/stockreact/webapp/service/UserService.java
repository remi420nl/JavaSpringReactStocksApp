package com.stockreact.webapp.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	public String testmethod() {
		return "crap";
	}
	
	public User registerUser(UserDTO userDto) {
		System.out.println("Registeruser called in service: "+ userDto.getCity());
		User user = mapToUser(userDto);
		System.out.println("user: "+ user.getFirstname());
		
		Portfolio portfolio = new Portfolio();
		portfolio.setName(userDto.getPortfolio());
		System.out.println("portfolio: "+ portfolio.getName());
		
		user.addPortfolio(portfolio);
		
		userRepo.save(user);
		
		return user;
	}
	
	private User mapToUser(UserDTO userDto) {
		
		String encodedPassword = bCryptPasswordEncoder.encode(userDto.getPassword());
				
		return 
		User.builder().username(userDto.getUsername()).firstname(userDto.getFirstname()).lastname(userDto.getLastname())
		.email(userDto.getEmail()).city(userDto.getCity()).password(encodedPassword).portfolios(new ArrayList<Portfolio>()).build();
		
	}
	


	
	

}
