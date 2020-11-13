package com.stockreact.webapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.stockreact.webapp.model.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {

	Optional<Stock> findByName(String stock);

	Optional<Stock> findBySymbol(String symbol);

	// Updating a Stock entity with its latest price and the date that the update
	// occurred
	@Transactional
	@Modifying
	@Query("UPDATE Stock s SET s.latestPrice = :price, s.lastUpdate = :date WHERE s.id = :stockId")
	int updatePriceAndDate(@Param("stockId") Long id, @Param("price") Double price, @Param("date") String date);

}
