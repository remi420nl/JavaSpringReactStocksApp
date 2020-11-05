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
		//TODO
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
		return PortfolioDTO.builder().id(p.getId()).description(p.getName()).positions(p.getPositions()).owner(p.getUser().getUsername())
				.competition(p.isCompetition()).cash(p.getCash()).build();
	}


	public Optional<Portfolio> getById(Long id) {
		return  portfolioRepo.findById(id);
	}

	public Portfolio save(@Valid Portfolio portfolio) {
		return portfolioRepo.save(portfolio);
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

		PortfolioDTO portFolioDTO = PortfolioDTO.builder().description(portfolio.getName())
				.build();
		return portFolioDTO;
	}


	public PortfolioDTO getByUserIncludingPositions(User user) {
		
		Optional<Portfolio> portfolio = portfolioRepo.findByUserId(user.getId());
		if(portfolio.isPresent()) {
			PortfolioDTO portfolioDTO = mapToDto(portfolio.get());
			portfolioDTO.setOwner(user.getFirstname() + ' ' + user.getLastname());
			return portfolioDTO;
		}
		return null;
	}


	@Override
	public boolean setCompetition(boolean competition, Long id) {
		
		int result = portfolioRepo.updateCompetion(competition, id);
		System.out.println("result" + result);
		return result == 1  ? true : false;
	}  
}
