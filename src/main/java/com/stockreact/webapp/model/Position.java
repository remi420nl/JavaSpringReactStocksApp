package com.stockreact.webapp.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="position")
public class Position {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	

	private String name;
	
	@ManyToOne
	private Stock stock;
	
	
	//lazy?eager??
	@ManyToOne(cascade= CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinColumn(name = "portfolio_id")
	private Portfolio portfolio;
	
	private int amount;

}
