package com.stockreact.webapp.service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.History;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.HistoryRepository;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.PositionRepository;
import com.stockreact.webapp.repository.StockRepository;

@Service
public class PositionService {
	
	@Autowired
	PositionRepository positionRepo;

	@Autowired
	StockRepository stockRepo;

	@Autowired
	PortfolioRepository portfolioRepo;

	@Autowired
	HistoryRepository historyRepo;	


	public Position addPosition(User user, @Valid PositionDTO dto) {
	
		Optional<Stock> optionalstock = stockRepo.findBySymbol(dto.getSymbol());

		Optional<Portfolio> optionalportfolio = portfolioRepo.findByUserId(user.getId());

		Stock stock = null;
		Portfolio portfolio = null;

		if (optionalstock.isPresent()) {
			stock = optionalstock.get();
			stock.setLastUpdate(dto.getDate());
			stock.setLatestPrice(dto.getPrice());
		} else {
			stock = new Stock();
			stock.setName(dto.getStock());
			stock.setSymbol(dto.getSymbol());
			stock.setLatestPrice(dto.getPrice());
			stock.setLastUpdate(dto.getDate());
		}

		if (optionalportfolio.isPresent()) {
			portfolio = optionalportfolio.get();
		} else {
		//this can be removed or exception handling
		}

		stockRepo.save(stock);
	//	portfolioRepo.save(portfolio);

		// making a new history record
		History history = buildHistory(dto);

		// check for positions with stock symbol in this particular portfolio
		Optional<Position> optionalposition = positionRepo.findTopByStockAndPortfolio(stock, portfolio);

		if (optionalposition.isPresent()) {
			Position position = optionalposition.get();

			//getting current amount and value
			int amount = position.getAmount();
			double value = position.getValue();

			position.addToHistory(history);
			position.setAmount(amount + dto.getAmount());
			position.setValue(value + dto.getValue());
			Position result = positionRepo.save(position);
			
			return result;
	}
		
		Position newposition = new Position();
		newposition.setName(dto.getName());
		newposition.setStock(stock);
		newposition.setPortfolio(portfolio);
		newposition.setAmount(dto.getAmount());
		// parse json string from dto to a double for the entity
		newposition.setValue(dto.getValue());
		newposition.addToHistory(history);

		Position result = positionRepo.save(newposition);
		
		return result;

}
	
	private History buildHistory(PositionDTO dto) {

		// setting the time format
		DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
				.withLocale(Locale.GERMANY).withZone(ZoneId.systemDefault());

		// actual date and time
		String time = formatter.format(Instant.now());

		History history = History.builder().amount(dto.getAmount()).price(dto.getPrice()).date(time).build();

		return history;
	}

	
	public void deleteById(Long id) {

		positionRepo.deleteById(id);
	}
}