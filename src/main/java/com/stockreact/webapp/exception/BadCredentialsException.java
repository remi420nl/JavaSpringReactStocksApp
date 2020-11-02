package com.stockreact.webapp.exception;

public class BadCredentialsException extends RuntimeException {

	public BadCredentialsException() {
		 super("Verkeerd wachtwoord ingevoerd");
	}
	
}
