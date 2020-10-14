package com.stockreact.webapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PortfolioDTO {
	
	private String owner;
	private String description;
	
	private List<Position> positions;

	
	
}
