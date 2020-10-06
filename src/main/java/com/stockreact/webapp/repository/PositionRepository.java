package com.stockreact.webapp.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.User;

public interface PositionRepository extends JpaRepository<Position, Long> {

List<Position> findByPortfolioId(Long id);

//
//@Query("select p.name,p.id FROM Position p WHERE p. = :id")
//getPositionWithStockSymbol(Long userid, String Stocksymbol);

Optional<Position> findTopByStockAndPortfolio(Stock stock, Portfolio portfolio);


}
