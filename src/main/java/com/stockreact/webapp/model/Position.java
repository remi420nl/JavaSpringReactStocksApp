package com.stockreact.webapp.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Builder
@Table(name = "position")
public class Position {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	//Eager fetchtype to enforce fetching when position is being initialized
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonManagedReference
	private Stock stock;

	//The one side of this relationship will serialize this relationship to avoid an infinite loop
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	private Portfolio portfolio;

	//the amount of stocks for a particular position
	private int amount;

	//the value of all the stocks in this position
	private double value;

	//this relationship gets deleted when its parent Position gets deleted
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "position_id")
	private List<History> history = new ArrayList<>();

	//each purchase/altering position will create an history object to track purchaes
	public void addToHistory(History history) {
		this.history.add(history);
	}
}
