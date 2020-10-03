package com.stockreact.webapp.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.PostDTO;
import com.stockreact.webapp.model.StockDTO;



public interface PortfolioRepository extends JpaRepository<Portfolio, Long>{

	//@Query(value ="SELECT p FROM Portfolio p Left Join Position o WHERE ?1 = p.id" )
	//	@Query(value ="SELECT p FROM Portfolio p Inner Join Position o ON(o.id = p.id) WHERE p.id = :id " )
	
	@Query("Select new com.stockreact.webapp.model.PositionDTO(pos.name, s.name,pos.amount,p.id) FROM Portfolio p, Position pos, Stock s Where p.id = pos.portfolio AND "
			+"s.id = pos.stock AND p.id = :id")
	List<PositionDTO> getPortfolioWithPositions(Long id);

	@Query("select p.name,p.id FROM Portfolio p WHERE p.id = :id")
	Collection<Portfolio> getPortfolioWithPositions2(Long id);
}
	