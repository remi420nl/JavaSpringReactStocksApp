package com.stockreact.webapp.service;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Matchers.anyLong;


import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.junit.jupiter.api.Test;

import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.PortfolioRepository;

public class TestPortfolioServiceImpl{

	public Collection<PortfolioDTO> getAll() {
		
		
		
		return null;
	}

	
	//Testing getById service method
	@Test
	public void getById() {
		PortfolioRepository mockRepo = mock(PortfolioRepository.class);
		
		
		PortfolioService service = new PortfolioServiceImpl(mockRepo);
		Portfolio portfolio = new Portfolio();
		
		when(mockRepo.findById(anyLong())).thenReturn(Optional.of(portfolio));
		
		assertEquals(service.getById((long) 2).getClass(), Portfolio.class);
	
	}

	
	//Testing if expception is thrown with correct message after trying to lookup a non existing Portfolio
	@Test
	public void throwExceptionIfNotExists() {
	PortfolioRepository mockRepo = mock(PortfolioRepository.class);
		
		
		PortfolioService service = new PortfolioServiceImpl(mockRepo);
		when(mockRepo.findById(anyLong())).thenReturn(Optional.empty());
		
		try {
			service.getById((long) 5);
			fail("Exception should have been thrown");
		}catch(Exception e) {
			assertEquals("No portfolio found", e.getMessage());
		}
	}
	
	
	public Portfolio save(@Valid Portfolio p) {
		// TODO Auto-generated method stub
		return null;
	}

	
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	public PortfolioDTO getAllStocksByPortfolioId(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	
	public PortfolioDTO getByUserIncludingPositions(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	
	public boolean setCompetition(boolean competition, Long id) {
		// TODO Auto-generated method stub
		return false;
	}
	
	
}
