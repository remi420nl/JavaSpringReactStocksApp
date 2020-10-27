package com.stockreact.webapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.StockDTO;
import com.stockreact.webapp.service.PositionService;
import com.stockreact.webapp.service.StockService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StockController {

	private final StockService stockService;
	
	
	@PostMapping("/stock/{id}")
	public ResponseEntity<?> updateStockPrice(@PathVariable Long id, @RequestBody StockDTO stockDTO) {
		System.out.printf("Stock update requested " + id + stockDTO);
		
		
		
		int stockid = stockService.updatePrice(id, stockDTO.getLatestPrice(), stockDTO.getLastUpdate());
		
		System.out.printf("Stock updated ",stockid);
		
		return  ResponseEntity.ok(stockid);
	}
	
}
