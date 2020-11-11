package com.stockreact.webapp;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.springframework.security.core.Authentication;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.service.PortfolioService;

public class PortfolioServiceStub  {

	
	private Portfolio getTestPortfolio() {
		Portfolio portfolio = new Portfolio();
		User user = new User();
		user.setFirstname("Test_User");
		Stock stock = new Stock();
		stock.setSymbol("TSLA");
		stock.setName("Tesla");
		
		List<Position> positions = new ArrayList<>();
		positions.add(Position.builder().stock(stock).amount(20).value(500).build());
		portfolio.setPositions(positions);
		portfolio.setUser(user);
		return portfolio;
	}
	


}
