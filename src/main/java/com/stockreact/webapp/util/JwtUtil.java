package com.stockreact.webapp.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.servlet.http.HttpServletRequest;

@Service
public class JwtUtil {
	private String SECRET_KEY = "secret";

	//extracting the name which is the subject of the JWT token claim
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    //Gtting the expiration time of the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    //Checking if the token that came with the request is expired or not
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    //Creating a token using jwts builder class with the username as subject. Encrypted with using HASH function
    private String createToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    //checking is token from httprequest is valid
    public Boolean validateToken(String token, UserDetails userDetails,HttpServletRequest  request) {

    	try {
    		final String username = extractUsername(token);
          if  (username.equals(userDetails.getUsername()) );
          isTokenExpired(token);
          return true;
    	}
    	
    	catch (ExpiredJwtException e){
            System.out.println("Expired JWT token");
            request.setAttribute("expired",e.getMessage());
        }
        return false;
    }
}