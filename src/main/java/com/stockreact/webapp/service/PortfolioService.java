package com.stockreact.webapp.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PortfolioService {

	private PortfolioRepository portfolioRepo;
	
	
	public void createPortfolio (String name) {
		
	}


	public Collection<PortfolioDTO> getAll() {
		

		List<PortfolioDTO> dtos = new ArrayList<>();
		
		List<Portfolio> portfolios  = portfolioRepo.findAll();
		
		for(Portfolio p : portfolios) {
			dtos.add(PortfolioDTO.builder().owner(p.getName()).positions(p.getPositions()).build());
		}
		return dtos; 
		
	}


	public Optional<Portfolio> getById(Long id) {
		return  portfolioRepo.findById(id);
	}

	public Portfolio save(@Valid Portfolio p) {
		
		return portfolioRepo.save(p);
	}


	public void delete(Long id) {
		portfolioRepo.deleteById(id);		
	}


	public PortfolioDTO getAllStocksByPortfolioId(Long id) {
		Optional<Portfolio> optional = portfolioRepo.findById(id);
		Portfolio portfolio = null;
		
		if(optional.isPresent()) {
			 portfolio = optional.get();
		}else {
			return new PortfolioDTO();
		}
		
		List<PositionDTO> positions = portfolioRepo.getPortfolioWithPositions(id);
//		
//		PortfolioDTO postDTO = new PostDTO();
//		postDTO.setOwner(portfolio.getName());
//		postDTO.setPositions(positions);
		PortfolioDTO portFolioDTO = PortfolioDTO.builder().description(portfolio.getName())
				.build();
		return portFolioDTO;
		
		
	}


	public PortfolioDTO getByUserIncludingPositions(Authentication authentication) {
		User user =  (User) authentication.getPrincipal();
		
		Optional<Portfolio> portfolio = portfolioRepo.findByUserId(user.getId());
		if(portfolio.isPresent()) {
			PortfolioDTO portFolioDTO = PortfolioDTO.builder().description(portfolio.get().getName()).owner(user.getFirstname() + ' ' + user.getLastname()).positions(portfolio.get().getPositions())
			.build();
			return portFolioDTO;
		}
		return null;
	
	}  
	
	
}
