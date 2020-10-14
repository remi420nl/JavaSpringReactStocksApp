package com.stockreact.webapp.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	private UserRepository userRepo;
	
	
	public User registerUser(UserDTO userDto) {
		
		User user = mapToUser(userDto);
		
		
		System.out.println("PORTFOLIO SIZE "+ user.getPortfolios().size());
	
		Portfolio portfolio = new Portfolio();
		portfolio.setName(userDto.getPortfolio());
		
		user.addPortfolio(portfolio);
		
		userRepo.save(user);
		
		return user;
	}
	
	private User mapToUser(UserDTO userDto) {
		
		
		return 
		User.builder().username(userDto.getUsername()).firstname(userDto.getFirstname()).lastname(userDto.getLastname())
		.email(userDto.getEmail()).city(userDto.getCity()).password(userDto.getPassword()).portfolios(new ArrayList<Portfolio>()).build();
		
	}
	


	
	

}
