package com.stockreact.webapp.controllers;

import java.net.URISyntaxException;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
import com.stockreact.webapp.service.PositionService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PositionController {
	
	//http endpoints for the Position entity, all private fields use constructor injection rather than Autowiring
	
	private final PositionService positionService;

	// posting a new position,for which the user has to be logged in
	@PostMapping("/position")
	public ResponseEntity<Position> createPosition(Authentication authentication, @Valid @RequestBody PositionDTO dto)
			throws URISyntaxException {

		User user = (User) authentication.getPrincipal();

		Position result = positionService.addPosition(user, dto);

		return ResponseEntity.ok(result);
	}

	// deleting (selling) a position, method doesn't return anything because the JPA
	// repository is void
	@DeleteMapping("/position/{id}")
	public void deletePosition(@PathVariable Long id) {
		positionService.deleteById(id);
	}
}
