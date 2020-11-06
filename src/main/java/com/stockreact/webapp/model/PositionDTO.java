package com.stockreact.webapp.model;

import java.time.Instant;
import java.util.List;

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

	@Id
	private Long id;
	
	private String name;
	
	public PositionDTO(String name, String stock, String symbol,int amount,double value,
			Long portfolioId) {
		super();
		this.name = name;
		this.stock = stock;
		this.symbol = symbol;
		this.amount = amount;
	
		this.value = value;
		this.portfolioId = portfolioId;
		
	}

	private String stock;
	
	private String symbol;

	private int amount;

	private double value;

	private Long portfolioId;

	private String date;
	private double price;

	
}
