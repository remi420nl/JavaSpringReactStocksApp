package com.stockreact.webapp.configurer;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.stockreact.webapp.filter.CustomAuthenticationProvider;
import com.stockreact.webapp.filter.JWTRequestFilter;
import com.stockreact.webapp.service.CustomUserDetailsService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfiger extends WebSecurityConfigurerAdapter {

	// custom authorizationprovider to be able to catch unknown user or bad credentials exceptions with custom exception handling
	private final CustomAuthenticationProvider authenticationProvider;
	private final CustomUserDetailsService userDetailsService;
	private final JWTRequestFilter jwtRequestFilter;

	private final DataSource datasource;

	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(datasource).passwordEncoder(passwordEncoder());
	}

	//so the password gets saved encrypted
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	
	//overriding for the cusom authentication provider
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	//setting up general security, register, portfolio and stock api calls are public 
	//and a jwt token interceptor to check the http requests for an Authorization header
	@Override
	public void configure(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.headers().frameOptions().sameOrigin();

		httpSecurity.cors().and().csrf().disable().authorizeRequests().antMatchers("/api/authenticate").permitAll()
				.antMatchers(HttpMethod.POST, "/api/stock/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/portfolio/").permitAll().antMatchers("/h2-console/**").permitAll()
				.antMatchers("/console/**").permitAll().antMatchers(HttpMethod.POST, "/api/register").permitAll()
				.anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

	}

}