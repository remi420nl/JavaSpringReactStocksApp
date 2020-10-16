package com.stockreact.webapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
public class Canbedeleted {
	
	private Long id;
	

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<PositionDTO> positions;
    



	private String Name;



}
