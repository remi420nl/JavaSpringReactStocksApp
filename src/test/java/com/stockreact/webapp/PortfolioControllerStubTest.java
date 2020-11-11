package com.stockreact.webapp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URISyntaxException;
import java.util.Collection;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.stockreact.webapp.controllers.PortfolioController;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.service.PortfolioService;
import com.stockreact.webapp.service.PortfolioServiceImpl;

public class PortfolioControllerStubTest {

//	private PortfolioService portfolioServiceStub = new PortfolioServiceStub();
	

	
	@Test
	public void testGetFirsPortfolioPositions_Stub() {
//		PortfolioController controller = new PortfolioController(portfolioServiceStub);
//		
//		Collection<PortfolioDTO> list = controller.getAllPortfolios();
//		
//		//checking first item in array (of size 1) for its List of Position object which also should have a size on 1
//		assertEquals(1, list.stream().findFirst().map(PortfolioDTO::getPositions).get().size());
	}
	

//	
//	public void testCreatePortfolio_Stub() {
//		Portfolio portfolio = new Portfolio();
////		PortfolioController controller = new PortfolioController(portfolioServiceStub);
//		ResponseEntity<Portfolio> result = null ;
//		
//		try {
////			 result = controller.createPortfolio(portfolio);
//		} catch (URISyntaxException e) {
//			
//			e.printStackTrace();
//		}
//		
//
//		assertEquals(HttpStatus.CREATED,result.getStatusCode());
	
}
