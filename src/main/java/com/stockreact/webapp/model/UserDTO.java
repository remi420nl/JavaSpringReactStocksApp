package com.stockreact.webapp.model;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private Long id;

	// DTO object for the endpoint to create or request a user, also includes
	// validation

	@NotBlank(message = "Gebruikernaam is verplicht")
	private String username;

	@NotBlank(message = "Voornaam is verplicht")
	private String firstname;
	@NotBlank(message = "Achternaam is verplicht")
	private String lastname;

	private String password;

	private String city;
	@NotBlank(message = "Email is verplicht")
	private String email;
	private String portfolio;
	private Long activePortfolio;
	private String info;

}
