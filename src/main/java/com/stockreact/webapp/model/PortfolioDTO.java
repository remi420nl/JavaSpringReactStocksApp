package com.stockreact.webapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PortfolioDTO {

	// used to create a usable data object for the client
	// the custom constructor is for when JPA executes the custom query that also
	// should include the Position entities
	public PortfolioDTO(Long id, String description, boolean competition, double cash, Portfolio portfolio) {
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
