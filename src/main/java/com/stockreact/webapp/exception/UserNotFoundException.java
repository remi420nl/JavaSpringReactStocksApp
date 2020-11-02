package com.stockreact.webapp.exception;

public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(String username) {
		super(String.format(("Gebruiker met naam `%s` niet gevonden"), username));

	}

	
	public UserNotFoundException(String username, Exception e) {
		super(String.format(("Gebruiker met naam %s niet gevonden"), username), e);

	}
}
