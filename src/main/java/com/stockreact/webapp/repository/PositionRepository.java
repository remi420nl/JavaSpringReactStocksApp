package com.stockreact.webapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.Stock;

public interface PositionRepository extends JpaRepository<Position, Long> {

List<Position> findByPortfolioId(Long id);


}
