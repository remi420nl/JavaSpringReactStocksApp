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
	
    @NotBlank(message = "Nfvbvby")
	private String firstname;
    @NotBlank(message = "Nasvsvory")
	private String lastname;
    @NotBlank(message = "Nasvsvory")
	private String password;
	
	private String city;
	  @NotBlank(message = "Nasvsvory")
	private String email;
	
	private String portfolio;
	
	private String info;

	
}
