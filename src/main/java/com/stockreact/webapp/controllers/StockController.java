package com.stockreact.webapp.controllers;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.StockDTO;
import com.stockreact.webapp.model.tempstock;
import com.stockreact.webapp.service.StockService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StockController {

	//http endpoints for the Stock entity, all private fields use constructor injection rather than Autowiring
	
	private final StockService stockService;

	// this controller is only being used to update the stock entities price
	// attribute directly from the client
	@PostMapping("/stock/{id}")
	public ResponseEntity<?> updateStockPriceAndDate(@PathVariable Long id, @RequestBody StockDTO stockDTO) {

		System.out.println("price" + stockDTO.getLatestPrice());
		int stockid = stockService.updatePrice(id, stockDTO.getLatestPrice(), stockDTO.getLastUpdate());

		return ResponseEntity.ok(stockid);
	}
	
	@GetMapping("stock/{type}")
	public ResponseEntity<?> getAllStocksByType(@PathVariable String type){
		
		Collection<Stock> stocks = stockService.getAllStocksByType(type);
			
		System.out.println(stocks.size());
		
		return ResponseEntity.ok(stocks);
	}
	

	//temp metho for loading new stocks
	@PostMapping("/stock/")
	public ResponseEntity<?> addNewStock(@RequestBody tempstock temp) {
		

		for(StockDTO dto : temp.getDtos()) {
			stockService.save2(dto);
		}
		
		return ResponseEntity.ok("ok");
	}
	
}
