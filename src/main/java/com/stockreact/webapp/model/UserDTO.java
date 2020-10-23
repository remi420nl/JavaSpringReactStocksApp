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
	
    @NotBlank(message = "gebruikernaam is verplicht")
	private String username;
	
    @NotBlank(message = "Voornaam is verplicht")
	private String firstname;
    @NotBlank(message = "Achternaam is verplicht")
	private String lastname;
    @NotBlank(message = "Wachtwoord is verplicht")
	private String password;
	
	private String city;
	  @NotBlank(message = "Email is verplicht")
	private String email;
	  @NotBlank(message = "Portfolionaam is verplicht")
	private String portfolio;
	
	private String info;

	
}
