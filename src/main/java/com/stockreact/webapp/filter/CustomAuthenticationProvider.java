package com.stockreact.webapp.filter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.stockreact.webapp.exception.BadCredentialsException;
import com.stockreact.webapp.exception.UserNotFoundException;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {
 
	final private UserRepository userRepo;
	
	
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
      
        Optional<User> authenticatedUser = userRepo.findByUsername(name);
        
       
        if(!authenticatedUser.isPresent()){
            throw new UserNotFoundException(name);
        }
        
        if(!BCrypt.checkpw(password, authenticatedUser.get().getPassword())) {
        	throw new BadCredentialsException();
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("User"));
        Authentication auth = new UsernamePasswordAuthenticationToken(name, password, authorities);
        return auth;
    }
 
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}