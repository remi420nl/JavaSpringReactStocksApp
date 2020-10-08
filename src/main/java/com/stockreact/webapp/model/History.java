package com.stockreact.webapp.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class History {
	
	

	@Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
	
	private String date;
	
	private double price;
	
	private int amount;
	
//
//	@ManyToOne
//	@JoinColumn(name = "position_id")
//	@JsonManagedReference
//	private Position position;
}
