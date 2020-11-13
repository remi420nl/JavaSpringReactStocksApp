package com.stockreact.webapp.service;

import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.Stock;


public interface StockService  {

public Collection<Stock> getAll() ;
	
	public Optional<Stock> getById(Long id);
	
	public Stock save(@Valid Stock stock);
	
	public void delete(Long id);
	
	public int updatePrice(Long id, double price, String date);
	
	Stock updateStock(Stock stock, PositionDTO dto);
	
	Stock createNewStock(PositionDTO dto);
}
