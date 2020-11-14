package com.stockreact.webapp.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.*;

import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.PortfolioDTO;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.service.PortfolioService;
import com.stockreact.webapp.service.UserService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PortfolioController {
	
	//http endpoints for the Portfolio entity, all private fields use constructor injection rather than Autowiring

	private final PortfolioService portfolioService;
	private final UserService userService;

	@GetMapping("/portfolio/")
	public Collection<PortfolioDTO> getAllPortfolios() {
		
		return portfolioService.getAll();
	}

	//to update a portfolio
	@PutMapping("/portfolio/{id}")
	public ResponseEntity<Portfolio> updatePortfolio(@Valid @RequestBody Portfolio p) {

		Portfolio result = portfolioService.save(p);
		return ResponseEntity.ok().body(result);

	}

	//to deleta a portfolio
	@DeleteMapping("/portfolio/{id}")
	public ResponseEntity<?> deletePortfolio(@PathVariable Long id) {

		portfolioService.delete(id);

		return ResponseEntity.ok().build();
	}

	//to post a new portfolio (not being used yet in frontend)
	@PostMapping("/portfolio")
	public ResponseEntity<Portfolio> createPortfolio(@Valid @RequestBody Portfolio p) throws URISyntaxException {

		Portfolio result = portfolioService.save(p);

		return ResponseEntity.created(new URI("/api/portfolio" + result.getId())).body(result);
	}

	//allowing users to participate in the competition by setting the value of the Competition column
	@GetMapping("/portfolio/{id}/{competition}")
	public boolean getStocksForPortfolioById(@PathVariable Long id, @PathVariable boolean competition) {
		
		return portfolioService.setCompetition(competition, id);

	}

	//getting the portfolio based on the logged in user, this configuration is only used in the current setting where a user can only have one portfolio
	@GetMapping("/portfolio/byuser")
	public ResponseEntity<?> getPortfolioByUser(Authentication authentication) {

		User user = (User) authentication.getPrincipal();

		PortfolioDTO ptest = portfolioService.getAllPositionsByPortfolioId(user);

		if (ptest != null) {
			return ResponseEntity.ok(ptest);
		}

		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
