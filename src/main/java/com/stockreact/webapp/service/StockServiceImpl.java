package com.stockreact.webapp.service;

import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.repository.StockRepository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
public class StockServiceImpl implements StockService {

	private StockRepository stockRepo;
	
	@Override
	public Collection<Stock> getAll() {
		
		return stockRepo.findAll();
	}

	@Override
	public Optional<Stock> getById(Long id) {
		
		return stockRepo.findById(id);
	}

	@Override
	public Stock save(@Valid Stock stock) {
		return stockRepo.save(stock);
	}

	@Override
	public void delete(Long id) {
		stockRepo.deleteById(id);
		
	}

	@Override
	public int updatePrice(Long id, double price, String date) {
		
		return stockRepo.updatePriceAndDate(id,price,date);
	}
	
	

}
