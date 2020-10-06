package com.stockreact.webapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockreact.webapp.model.Stock;

public interface StockRepository extends JpaRepository<Stock,Long>{

	Optional<Stock> findByName(String stock);

	Optional<Stock> findBySymbol(String symbol);

}
