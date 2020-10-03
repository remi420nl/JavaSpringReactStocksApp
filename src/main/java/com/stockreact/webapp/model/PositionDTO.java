package com.stockreact.webapp.model;

import javax.persistence.Id;

public class PositionDTO {

	@Id
	private Long id;
	
	private String name;
	
	private String stock;
	
	public PositionDTO(String name, String stock, int amount, Long portfolioId) {
		super();
		this.name = name;
		this.stock = stock;
		this.amount = amount;
		this.portfolioId = portfolioId;
	}

	private int amount;
	
	private int value;

	private Long portfolioId;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStock() {
		return stock;
	}

	public void setStock(String stock) {
		this.stock = stock;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public Long getPortfolioId() {
		return portfolioId;
	}

	public void setPortfolioId(Long portfolioId) {
		this.portfolioId = portfolioId;
	}
	
	
}
