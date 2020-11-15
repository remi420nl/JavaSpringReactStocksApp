package com.stockreact.webapp.service;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.History;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.PositionRepository;
import com.stockreact.webapp.repository.StockRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PositionServiceImpl implements PositionService{
	
	private PositionRepository positionRepo;
	private StockRepository stockRepo;
	private PortfolioRepository portfolioRepo;
	private HistoryService historyService;
	private StockService stockService;

	//To add a new Position or update an existing one (buy transaction)
	@Override
	public Position addOrUpdatePosition(User user, @Valid PositionDTO dto) {
	
		//Checking wether stock already exists or not
		Stock stock = checkOrCreateStock(dto);
		
		//Getting Portfolio that has this user_id assigned to it
		Optional<Portfolio> optionalportfolio = portfolioRepo.findByUserId(user.getId());

		Portfolio portfolio = optionalportfolio.map(p -> p).orElseThrow(() -> new StockAppException("No portfolio found user "+ user.getUsername()));
		
		//Creating a new history record to track history
		History history = historyService.buildHistory(dto);

		//Check for positions with stock symbol in this particular portfolio
		Optional<Position> optionalposition = positionRepo.findTopByStockAndPortfolio(stock, portfolio);

		//If there is an existing position it will be updated and returns it
		//Java 8 doesn't allow an inline Optional function call if no optional is present so this will be executed differently than the previous ones
		if(optionalposition.isPresent()) {
			
		Position position = optionalposition.get();
		
		//Getting current amount and value
		int amount = position.getAmount();
		double value = position.getValue();

		position.addToHistory(history);
		position.setAmount(amount + dto.getAmount());
		position.setValue(value + dto.getValue());
		Position result = positionRepo.save(position);
		
		return result;
		}

		//If no Optional is present than this gets executed
		Position newposition = new Position();
		newposition.setName(dto.getName());
		newposition.setStock(stock);
		newposition.setPortfolio(portfolio);
		newposition.setAmount(dto.getAmount());
		
		// parse json string from dto to a double for the entity
		newposition.setValue(dto.getValue());
		newposition.addToHistory(history);

		Position result = positionRepo.save(newposition);
		
		//updating the cash balance
		portfolio.setCash(portfolio.getCash()-dto.getValue());
		portfolioRepo.save(portfolio);
		
		return result;
}
	
	private Stock checkOrCreateStock(@Valid PositionDTO dto) {
		
		Stock stock = null;
		
		Optional<Stock> optionalstock = stockRepo.findBySymbol(dto.getSymbol());
		
		if (optionalstock.isPresent()) {
			 stock = optionalstock.get();
			stockService.updateStock(stock, dto);
		} else {
			stock = stockService.createNewStock(dto);
		}
		return stockRepo.save(stock);
	}

	//Deleting(selling) a position
	@Override
	public void deleteById(Long id) {
		
		Position position = positionRepo.findById(id).map(p -> p).orElseThrow(() ->  new StockAppException("Position not found"));

		Portfolio portfolio = portfolioRepo.findById(position.getPortfolio().getId()).map(p -> p).orElseThrow(() ->  new StockAppException("Portfolio not found"));
		
		//The current value of the sold position gets added to the portfolio balance
		portfolio.setCash(portfolio.getCash() + position.getValue());
		
		portfolioRepo.save(portfolio);
		
		//Finally the position gets deleted in the database
		positionRepo.deleteById(id);
	}
}