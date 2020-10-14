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
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.PostDTO;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.StockDTO;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.repository.PortfolioRepository;
import com.stockreact.webapp.repository.PositionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PortfolioController {
	
	@Autowired
	private PortfolioRepository portfolioRepo;
	

	@GetMapping("/portfolio")
	public Collection<PortfolioDTO> getAllPortfolios(){
		
		List<PortfolioDTO> dtos = new ArrayList<>();
		
		List<Portfolio> portfolios  = portfolioRepo.findAll();
		
		for(Portfolio p : portfolios) {
			dtos.add(PortfolioDTO.builder().owner(p.getName()).positions(p.getPositions()).build());
		}
		return dtos; 
	}
	
	@GetMapping("/portfolio/{id}")
	public ResponseEntity<Portfolio> getPortfolioById(@PathVariable Long id) {
		Optional<Portfolio> p = portfolioRepo.findById(id);
		
		return p.map(res -> ResponseEntity.ok().body(res)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PutMapping("/portfolio/{id}")
	public ResponseEntity<Portfolio> updatePortfolio (@Valid @RequestBody Portfolio p) {
		
		Portfolio result = portfolioRepo.save(p);
		return ResponseEntity.ok().body(result);
		
	}
	
	@DeleteMapping("/portfolio/{id}") 
	public ResponseEntity<?> deletePortfolio (@PathVariable Long id){
		
		portfolioRepo.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/portfolio")
	public ResponseEntity<Portfolio>createPortfolio(@Valid @RequestBody Portfolio p) throws URISyntaxException{
	
		Portfolio result = portfolioRepo.save(p);
		
		return ResponseEntity.created(new URI("/api/portfolio" + result.getId())).body(result);
	}
	
	@GetMapping("/portfoliotest/{id}")
	public PostDTO getStocksForPortfolioById(@PathVariable Long id) {
		
		Optional<Portfolio> optional = portfolioRepo.findById(id);
		Portfolio portfolio = null;
		
		if(optional.isPresent()) {
			 portfolio = optional.get();
		}else {
			return new PostDTO();
		}
		
		List<PositionDTO> positions = portfolioRepo.getPortfolioWithPositions(id);
		
		PostDTO postDTO = new PostDTO();
		postDTO.setId(id);
		postDTO.setName(portfolio.getName());
		postDTO.setPositions(positions);
		
		return postDTO;
		
	}
	
	@GetMapping("/portfolio/byuser")
	public ResponseEntity<?> getPortfolioByIdTest2(Authentication authentication) {
	
			
		User user =  (User) authentication.getPrincipal();
			
		Optional<Portfolio> portfolio = portfolioRepo.findByUserId(user.getId());
		if(portfolio.isPresent()) {
			PortfolioDTO portFolioDTO = PortfolioDTO.builder().description(portfolio.get().getName()).owner(user.getFirstname() + ' ' + user.getLastname()).positions(portfolio.get().getPositions())
			.build();
			return ResponseEntity.ok(portFolioDTO);
		}
	
		 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		
		
	}
	
} 
