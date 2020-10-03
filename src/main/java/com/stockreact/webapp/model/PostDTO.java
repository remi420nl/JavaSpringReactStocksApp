package com.stockreact.webapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

public class PostDTO {
	
	private Long id;
	

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<PositionDTO> positions;
    

	public List<PositionDTO> getPositions() {
		return positions;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}


	private String Name;




	public void setPositions(List<PositionDTO> positions) {
		this.positions = positions;
	}
	


}
