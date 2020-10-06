package com.stockreact.webapp.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="portfolio")
public class Portfolio {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	private String name;
	
	
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	

	
	
//	@OneToMany(  
//		    cascade = CascadeType.ALL,
//		    orphanRemoval = true)

// TRY on Position ManytoOne side:   @JoinColumn(name = "id", referencedColumnName = "id") and set  this to (fetch = lazy)

	@OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY)
	@JsonBackReference
	private List<Position> positions;
	
	
	
}
