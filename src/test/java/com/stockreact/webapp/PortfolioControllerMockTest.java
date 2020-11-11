package com.stockreact.webapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.stockreact.webapp.controllers.PortfolioController;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.service.PortfolioService;

import io.jsonwebtoken.ExpiredJwtException;

public class PortfolioControllerMockTest {
	

	PortfolioService portfolioServiceMock = mock(PortfolioService.class);
	PortfolioController controller;
	PortfolioServiceStub portfolioTestStub;
	
	@BeforeEach
	void setup() {
//		controller = new PortfolioController(portfolioServiceMock);
	
	}
	
	
	@Test
	public void testControllerGetAll() {
		
		when(portfolioServiceMock.getAll()).thenReturn(new ArrayList<PortfolioDTO>());
	
		Collection<PortfolioDTO> list = controller.getAllPortfolios();
		
		assertEquals(0,list.size());
		
		
		//checking first item in array (of size 1) for its List of Position object which also should have a size on 1
		//assertEquals(1, list.stream().findFirst().map(PortfolioDTO::getPositions).get().size());
	}
	
	
	@Test
	public void testControllerGetStocks() {
		
	User user = new User(); 
	user.setUsername("TestUser");
		
//	when(portfolioServiceMock.getByUserIncludingPositions(user)).thenReturn(new PortfolioDTO());
	
	}
	
	@Test
	public void testControllerException() {
	when(controller.getPortfolioByUser(new UsernamePasswordAuthenticationToken(null, null))).thenThrow(new ExpiredJwtException(null, null, null));
	
	assertThrows(RuntimeException.class, ()-> controller.getPortfolioByUser(null));
	
	}
	

	
}
