package com.stockreact.webapp.model;

import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PositionDTO {
	
	public PositionDTO (String name, String stockname, int amount, Long portfolioId ) {
		this.name= name;
		stock = stockname;
		this.amount = amount;
		this.portfolioId = portfolioId;
	}
	
	

	@Id
	private Long id;
	
	private String name;
	
	private String stock;
	
	private String symbol;
	

	private int amount;

	private String price;
	
	private double value;

	private Long portfolioId;
	

	
}
