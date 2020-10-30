package com.stockreact.webapp.model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class AuthenticationResponse implements Serializable {

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