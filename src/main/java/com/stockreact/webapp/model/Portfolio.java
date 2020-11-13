package com.stockreact.webapp.model;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "portfolio")
public class Portfolio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	// initial starting cash value
	private double cash = 10000;

	private boolean competition = true;

	// this field is not part of the output when this object is written to json
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;

	// this field gets serialized when the endpoint creates a json, the many side
	// not otherwise it creates a loop
	// and it will only be initialized by the service so fetchtype is set to Lazy
	@OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY, orphanRemoval = true)
	@JsonManagedReference
	private List<Position> positions;
}
