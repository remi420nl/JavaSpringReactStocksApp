package com.stockreact.webapp.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.StockDTO;
import com.stockreact.webapp.repository.StockRepository;

import lombok.AllArgsConstructor;

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
	public Stock save2(@Valid StockDTO dto) {
		Stock stock = Stock.builder().name(dto.getName()).description(dto.getDescription()).symbol(dto.getSymbol()).build();
		
		return stockRepo.save(stock);
	}
	
	@Override
	public void delete(Long id) {
		stockRepo.deleteById(id);
	}

	//Update stock price and date directly from the client when there is a new price available
	@Override
	public int updatePrice(Long id, double price, String date) {
		return stockRepo.updatePriceAndDate(id, price, date);
	}

	
	//Update stock from the position service when a new position gets added
	@Override
	public Stock updateStock(Stock stock, PositionDTO dto) {

		stock.setLastUpdate(dto.getDate());
		stock.setLatestPrice(dto.getPrice());

		return stock;
	}

	@Override
	public Stock createNewStock(PositionDTO dto) {
		Stock stock = new Stock();
		stock.setName(dto.getStock());
		stock.setSymbol(dto.getSymbol());
		stock.setLatestPrice(dto.getPrice());
		stock.setLastUpdate(dto.getDate());
		stock.setDescription(dto.getDescription());

		return save(stock);
	}

	@Override
	public Collection<Stock> getAllStocksByType(String type) {
		
		return stockRepo.findAllByDescription(type);
	}

}
