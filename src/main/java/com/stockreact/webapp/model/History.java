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
	
	//for saving the history of each purchase, this is the many side of the position-history relaionshop
	//it has a joined column set by java persistence : position_id

	@Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
	
	private String date;
	
	private double price;
	
	private int amount;
	
}
