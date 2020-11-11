package com.stockreact.webapp.controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockreact.webapp.exception.BadCredentialsException;
import com.stockreact.webapp.exception.UserNotFoundException;
import com.stockreact.webapp.filter.CustomAuthenticationProvider;
import com.stockreact.webapp.model.AuthenticationRequest;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;
import com.stockreact.webapp.service.UserService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RunWith(SpringRunner.class)
@SpringBootTest

class TestUserController {

	@MockBean
	private UserService service;

	@MockBean
	private  AuthenticationManager authManager;
	
	@InjectMocks
	UserDTO dto;

	
	@Autowired
	UserController userController;

	@Autowired
	private WebApplicationContext webApplicationContext;
	
	private MockMvc mockMvc;

	
	@BeforeEach
	public void setup() {

	this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
	}

	@Test
	void createNewUser() {
		when(service.registerUser(dto)).thenReturn(new User());

		assertEquals(new ResponseEntity<>(new User(), HttpStatus.OK), userController.register(dto));

	}
	
	
	

	@WithMockUser("spring")
	@Test
	public void testGetUser() throws Exception {
		mockMvc.perform(get("/api/user/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
	
//	@Test
//	public void testLogin() throws Exception {
//		
//		AuthenticationRequest authenticationRequest = new AuthenticationRequest("test", "test");
//		
//		Authentication auth = mock(Authentication.class);
//		
//		
//		UsernamePasswordAuthenticationToken token = mock(UsernamePasswordAuthenticationToken.class);
//		
//		CustomAuthenticationProvider provider = mock(CustomAuthenticationProvider.class);
//		
//		when(authManager.authenticate(token)).thenReturn(auth);
//		when(provider.authenticate(auth)).thenReturn(auth);
//		
//		UserDetailsService userDetailsService = mock(UserDetailsService.class);
//	
//		
//		when(userDetailsService.loadUserByUsername(authenticationRequest.getUsername())).thenReturn(new User());
//		
//		token = new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername()
//				,authenticationRequest.getPassword());	
//		
//		
//	
//		
//		
//		
//		ObjectMapper mapper = new ObjectMapper();
//	
//		String jsonString = mapper.writeValueAsString(authenticationRequest);
//		
//		mockMvc.perform(post("/api/authenticate").contentType(MediaType.APPLICATION_JSON).content(jsonString)).andExpect(status().isOk());
//
//	}
//	
	   @Test
	    @WithAnonymousUser
	    public void anonymous() throws Exception {
	        // override default to run as anonymous user
	    }
}
