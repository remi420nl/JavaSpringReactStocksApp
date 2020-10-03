package com.stockreact.webapp.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
	
	private Long id;
	
	private String username;
	
	private String firstname;
	
	private String lastname;
	
	private String password;
	
	private String city;
	
	private String email;

}
