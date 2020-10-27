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
	
	private String name;
		
	private String symbol;
	
	private String lastUpdate;
	
	private Double latestPrice;

	

}
