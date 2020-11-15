package com.stockreact.webapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.model.StockDTO;
import com.stockreact.webapp.service.StockService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StockController {

	//http endpoints for the Stock entity, all private fields use constructor injection rather than Autowiring
	
	private final StockService stockService;

	// this conntroller is only being used to update the stock entities price
	// attribute directly from the client
	@PostMapping("/stock/{id}")
	public ResponseEntity<?> updateStockPriceAndDate(@PathVariable Long id, @RequestBody StockDTO stockDTO) {

		int stockid = stockService.updatePrice(id, stockDTO.getLatestPrice(), stockDTO.getLastUpdate());

		return ResponseEntity.ok(stockid);
	}
}
