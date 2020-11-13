package com.stockreact.webapp.model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class AuthenticationResponse implements Serializable {

	//DTO to form a response for the user with its token and userid
	
    private final String jwt;

    public AuthenticationResponse(String jwt, Long id) {
        this.jwt = jwt;
        userId = id;
    }

    public String getJwt() {
        return jwt;
    }
    
    public Long userId;
}