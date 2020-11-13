package com.stockreact.webapp.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.User;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

List<Position> findByPortfolioId(Long id);

//Find the first matching position that matches the stock and portfolio entity to determine if an position already exists
Optional<Position> findTopByStockAndPortfolio(Stock stock, Portfolio portfolio);

void deleteById(Long id);

}
