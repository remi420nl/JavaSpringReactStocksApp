package com.stockreact.webapp.model;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PositionDTO {

	//To create a json output for every position and to provide one for each request (post)
	
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

	//name of the stock "eg APPLE"
	private String stock;
	
	//symbol\ticker "eg AAPL "
	private String symbol;

	//total amount stocks 
	private int amount;

	//what kind of stock (nationality)
	private String description;
	
	//value of all the stocks in this position or request
	private double value;

	//portfolio id associated with it
	private Long portfolioId;

	//to track the date
	private String date;
	
	//the stockprice at the moment the position creation happened
	private double price;

	
}
