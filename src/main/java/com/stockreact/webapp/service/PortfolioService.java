package com.stockreact.webapp.service;

import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.security.core.Authentication;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.User;

public interface PortfolioService {

	public Collection<PortfolioDTO> getAll() ;
	
	public Optional<Portfolio> getById(Long id);
	
	public Portfolio save(@Valid Portfolio p);
	
	public void delete(Long id);
	
	public PortfolioDTO getAllStocksByPortfolioId(User user) ;
	
	public PortfolioDTO getByUserIncludingPositions(User user) ;
	
	public boolean setCompetition(boolean competition,Long id);
	
}
