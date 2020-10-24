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
public class PortfolioServiceImpl implements PortfolioService {

	private PortfolioRepository portfolioRepo;
	
	
	public void createPortfolio (String name) {
		
	}


	public Collection<PortfolioDTO> getAll() {
		

		List<PortfolioDTO> dtos = new ArrayList<>();
		
		List<Portfolio> portfolios  = portfolioRepo.findAll();
		
		for(Portfolio p : portfolios) {
			dtos.add(mapToDto(p));
		}
		return dtos; 
		
	}


	private PortfolioDTO mapToDto(Portfolio p) {
		return PortfolioDTO.builder().description(p.getName()).positions(p.getPositions()).owner(p.getUser().getUsername())
				.build();
		
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


	public PortfolioDTO getByUserIncludingPositions(User user) {
		
		Optional<Portfolio> portfolio = portfolioRepo.findByUserId(user.getId());
		if(portfolio.isPresent()) {
			PortfolioDTO portfolioDTO = mapToDto(portfolio.get());
			System.out.println("description " + portfolioDTO.getDescription());
			portfolioDTO.setOwner(user.getFirstname() + ' ' + user.getLastname());
			return portfolioDTO;
		}
		return null;
	
	}  
	
	
}
