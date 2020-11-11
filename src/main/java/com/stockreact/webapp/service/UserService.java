package com.stockreact.webapp.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Service
public class UserService {

	private UserRepository userRepo;
	private PortfolioService portfolioService;

	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public User registerUser(UserDTO userDto) {

		// first check if username already exists
		int check = userRepo.checkUsernameExists(userDto.getUsername());
		if (check == 1) {
			throw new StockAppException("Gebruikersnaam is reeds in gebruik");
		}

		User user = mapToUser(userDto);

		Portfolio portfolio = new Portfolio();
		portfolio.setName(userDto.getPortfolio());
		portfolioService.save(portfolio);
		
		user.addPortfolio(portfolio);
		
		user.setActivePortfolio(portfolio.getId());
		userRepo.save(user);

		return user;
	}

	private User mapToUser(UserDTO userDto) {

		String encodedPassword = bCryptPasswordEncoder.encode(userDto.getPassword());

		return User.builder().username(userDto.getUsername()).firstname(userDto.getFirstname())
				.lastname(userDto.getLastname()).email(userDto.getEmail()).city(userDto.getCity())
				.password(encodedPassword).portfolios(new ArrayList<Portfolio>()).build();
	}

	public UserDTO mapToDto(User user) {
		
		return UserDTO.builder().id(user.getId()).username(user.getUsername()).firstname(user.getFirstname())
				.lastname(user.getLastname()).email(user.getEmail()).city(user.getCity()).activePortfolio(user.getActivePortfolio()).build();
	}

	public UserDTO getById(Long id) {

		User user = userRepo.findById(id).map(u -> u).orElseThrow(() -> new StockAppException("User not found"));

		return mapToDto(user);
	}

	public UserDTO updateUser(Long id, UserDTO userDto) {

		User user = userRepo.getOne(id);

		user.setFirstname(userDto.getFirstname());
		user.setLastname(userDto.getLastname());
		user.setEmail(userDto.getEmail());
		user.setCity(userDto.getCity());
		if (userDto.getPassword() != null) {
			String encodedPassword = bCryptPasswordEncoder.encode(userDto.getPassword());
			user.setPassword(encodedPassword);
		}
		User saveduser = userRepo.save(user);
		return mapToDto(saveduser);
	}
}
