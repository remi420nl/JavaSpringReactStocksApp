package com.stockreact.webapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class PortfolioDTO {
	
	public PortfolioDTO(Long id,String description, boolean competition, double cash, Portfolio portfolio) {
		super();
		this.id = id;
		this.description = description;
		this.competition = competition;
		this.cash = cash;
		this.positions = portfolio.getPositions();
	
	}
	private Long id;
	private String owner;
	private String description;
	private boolean competition;
	private double cash;
	private List<Position> positions;

	
}
