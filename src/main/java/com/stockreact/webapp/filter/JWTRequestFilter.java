package com.stockreact.webapp.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.stockreact.webapp.service.CustomUserDetailsService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class JWTRequestFilter extends OncePerRequestFilter {

	// custom jwt token intercepter

	private CustomUserDetailsService userDetailsService;

	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// getting Authorization header
		final String authorizationHeader = request.getHeader("Authorization");

		String username = null;
		String jwt = null;

		// each token has to start with Bearer ....
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwt = authorizationHeader.substring(7);
			username = jwtUtil.extractUsername(jwt);
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			if (jwtUtil.validateToken(jwt, userDetails, request)) {

				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null,
						userDetails.getAuthorities());
				token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(token);
			} else {

				final String expired = (String) request.getAttribute("expired");
				if (expired != null) {
					System.out.println("expired token in dofilterInternal found ");
					response.sendError(HttpServletResponse.SC_UNAUTHORIZED, expired);
				}
			}
		}
		//the filterchain continues this request to its destination
		filterChain.doFilter(request, response);

	}

}
