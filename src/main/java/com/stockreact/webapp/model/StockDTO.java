package com.stockreact.webapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StockDTO {
	

	//To create a json output for every stock api call and request (post)
	
	private String name;
		
	private String symbol;
	
	//the last time this entity has been updated by the client to determine if its due to an update
	private String lastUpdate;
	
	//ths gets set along with the previous variable to save its current price
	private Double latestPrice;

	

}
