package com.stockreact.webapp.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PortfolioServiceImpl implements PortfolioService {

	private PortfolioRepository portfolioRepo;

	//Getting all portfolios and mapping them to DTO's for JSON serializing 
	public Collection<PortfolioDTO> getAll() {

		return portfolioRepo.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	//Helper method, converting Portfolio entity to PortfolioDTO using static builder class from DTO model
	private PortfolioDTO mapToDto(Portfolio p) {
		return PortfolioDTO.builder().id(p.getId()).description(p.getName()).positions(p.getPositions()).owner(p.getUser().getUsername())
				.competition(p.isCompetition()).cash(p.getCash()).build();
	}

	//Return requesting Portfolio if exists
	public Portfolio getById(Long id) {
		return  portfolioRepo.findById(id).map(p -> p).orElseThrow(() -> new StockAppException("No portfolio found"));
	}

	public Portfolio save(@Valid Portfolio portfolio) {
		return portfolioRepo.save(portfolio);
	}

	//Not in use yet
	public void delete(Long id) {
		portfolioRepo.deleteById(id);		
	}

	//Getting Portfolio with all its positions from the database and setting the owner 
	public PortfolioDTO getAllPositionsByPortfolioId(User user) {
		
		PortfolioDTO portfolioDTO = portfolioRepo.getPortfolioWithPositions1(user.getActivePortfolio());
		portfolioDTO.setOwner(user.getFirstname() + ' ' + user.getLastname());

		return portfolioDTO;
	}

	//Setting value for taking part of the competition and return the result 
	public boolean setCompetition(boolean competition, Long id) {
		
		int result = portfolioRepo.updateCompetion(competition, id);
		return result == 1  ? true : false;
	}  
	
	public void createPortfolio (String name) {
		//TODO
	}

}
