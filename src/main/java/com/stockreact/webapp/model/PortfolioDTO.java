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
@NoArgsConstructor
public class PortfolioDTO {
	
	private Long id;
	private String owner;
	private String description;
	private boolean competition;
	private double cash;
	private List<Position> positions;

	
}
