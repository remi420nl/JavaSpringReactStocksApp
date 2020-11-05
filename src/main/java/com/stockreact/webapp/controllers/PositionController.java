package com.stockreact.webapp.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Collection;
import java.util.Locale;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;

import com.stockreact.webapp.model.User;
import com.stockreact.webapp.service.PortfolioService;
import com.stockreact.webapp.service.PositionService;
import com.stockreact.webapp.service.UserService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PositionController {

	private final PositionService positionService;

	
	@PostMapping("/position")
	public ResponseEntity<Position> createPosition(Authentication authentication, @Valid @RequestBody PositionDTO dto)
			throws URISyntaxException {

		User user = (User) authentication.getPrincipal();

		Position result = positionService.addPosition(user, dto);
	
		return ResponseEntity.created(new URI("/api/position" + result.getId())).body(result);
	}

	
	@DeleteMapping("/position/{id}")
	public void deletePosition(@PathVariable Long id) {
		positionService.deleteById(id);
	}

}
