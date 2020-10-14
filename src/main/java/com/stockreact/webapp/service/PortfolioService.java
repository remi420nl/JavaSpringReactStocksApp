package com.stockreact.webapp.service;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PortfolioService {

	private PortfolioRepository portfolioRepo;
	
	
	public void createPortfolio (String name) {
		
	}  
	
	
}
