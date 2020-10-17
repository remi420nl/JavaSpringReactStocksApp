package com.stockreact.webapp.controllers
;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
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
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;


import com.stockreact.webapp.service.PortfolioService;
import com.stockreact.webapp.service.UserService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PortfolioController {
	

	private final PortfolioService portfolioService;

	@GetMapping("/portfolio")
	public Collection<PortfolioDTO> getAllPortfolios(){
		
		return portfolioService.getAll();
	}
	
	@GetMapping("/portfolio/{id}")
	public ResponseEntity<Portfolio> getPortfolioById(@PathVariable Long id) {
		Optional<Portfolio> portfolio = portfolioService.getById(id);
		
		return portfolio.map(res -> ResponseEntity.ok().body(res)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PutMapping("/portfolio/{id}")
	public ResponseEntity<Portfolio> updatePortfolio (@Valid @RequestBody Portfolio p) {
		
		Portfolio result = portfolioService.save(p);
		return ResponseEntity.ok().body(result);
		
	}
	
	@DeleteMapping("/portfolio/{id}") 
	public ResponseEntity<?> deletePortfolio (@PathVariable Long id){
		
		portfolioService.delete(id);
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/portfolio")
	public ResponseEntity<Portfolio>createPortfolio(@Valid @RequestBody Portfolio p) throws URISyntaxException{
	
		Portfolio result = portfolioService.save(p);
		
		return ResponseEntity.created(new URI("/api/portfolio" + result.getId())).body(result);
	}
	
	@GetMapping("/portfoliotest/{id}")
	public PortfolioDTO getStocksForPortfolioById(@PathVariable Long id) {
		System.out.println("getstocksforportfoliobyID called..");
	
		
		return portfolioService.getAllStocksByPortfolioId(id);
		
	}
	
	@GetMapping("/portfolio/byuser")
	public ResponseEntity<?> getPortfolioByIdTest2(Authentication authentication) {
	
		System.out.println("getstocksforportfoliobyID By user called..");
		
		
		PortfolioDTO portFolioDTO = portfolioService.getByUserIncludingPositions(authentication); 

		if(portFolioDTO != null) {
			return ResponseEntity.ok(portFolioDTO);
		}
		 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		
		
	}
	
} 
