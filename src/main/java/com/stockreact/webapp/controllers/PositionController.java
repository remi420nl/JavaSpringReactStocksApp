package com.stockreact.webapp.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.PositionRepository;
import com.stockreact.webapp.repository.StockRepository;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class PositionController {
	
	@Autowired
	PositionRepository positionRepo;
	
	@Autowired
	StockRepository stockRepo;
	
	@Autowired
	PortfolioRepository portfolioRepo;
	
	@GetMapping("/position/byportfolio/{id}")
	Collection<Position> getByPorfolioId(@PathVariable Long id){
		System.out.println("get portfolio called with id " + id);
		
	Collection<Position> positions = positionRepo.findByPortfolioId(id);
	System.out.println("positions: " + positions.size());
		return positions;
		
	}
	
	@PostMapping("/newposition")
	public ResponseEntity<Position>createPosition(@Valid @RequestBody PositionDTO dto) throws URISyntaxException{
		
		System.out.println("POSTED!!" + dto.getStock() + " " + dto.getPortfolioId());
		
		Optional<Stock> optionalstock = stockRepo.findByName(dto.getStock());
		
		Optional<Portfolio> optionalportfolio = portfolioRepo.findById(dto.getPortfolioId());
		
		
		
		Stock stock = null;
		Portfolio portfolio = null;
		
		if(optionalstock.isPresent()) {
			stock = optionalstock.get();
		}else {
			stock = new Stock();
			stock.setName(dto.getStock());
		}
		
		if(optionalportfolio.isPresent()) {
			portfolio = optionalportfolio.get();
		}else {
			portfolio = new Portfolio();
			portfolio.setName("Dummy portfolio");
		}
		
		stockRepo.save(stock);
		portfolioRepo.save(portfolio);
		
		Position position = new Position();
		position.setName(dto.getName());
		position.setStock(stock);
		position.setPortfolio(portfolio);
		position.setAmount(dto.getAmount());
		Position result = positionRepo.save(position);
		
		return ResponseEntity.created(new URI("/api/position" + result.getId())).body(result);
		
		
	}

	
	
	
}
