package com.stockreact.webapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.PositionDTO;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
	
	//Created a new PositionDTO from  every portfolio including its positions that matched the id
	@Query("SELECT new com.stockreact.webapp.model.PositionDTO(pos.name,s.name, s.symbol , pos.amount, pos.value, p.id) FROM Portfolio p, Position pos, Stock s Where p.id = pos.portfolio AND "
			+ "s.id = pos.stock AND p.id = :id")
	List<PositionDTO> getPortfolioWithPositions(Long id);

	//Creates a new PortfolioDTO from the portfolio record that matched the id, the positions get mapped in the DTO constructor
	@Query("SELECT new com.stockreact.webapp.model.PortfolioDTO(p.id, p.name ,p.competition, p.cash , p) FROM Portfolio p Where p.id = :id")
	PortfolioDTO getPortfolioWithPositions1(Long id);

	Optional<Portfolio> findByUserId(Long userId);

	//Setting the competition column to true of false
	@Transactional
	@Modifying
	@Query("UPDATE Portfolio p SET p.competition = ?1 WHERE p.id = ?2")
	int updateCompetion(boolean competition, Long id);
}
