package com.stockreact.webapp.exception;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.logging.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

	
	//When a non valid arguments gets passed 
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		
		Map<String, Object> body = new LinkedHashMap<>();
		
		body.put("timestamp", LocalDate.now());
		body.put("status", status.value());
		
		List<String> errors = ex.getBindingResult().getFieldErrors().stream()
							.map(e -> e.getDefaultMessage()).collect(Collectors.toList());
		
		body.put("errors", errors);
		
		return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);
	}
	

//	@ExceptionHandler(StockAppException.class)
//	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//	@ResponseBody
//	public StockAppException handleCustomException (StockAppException ex) {
//	return ex;
//
//
//	}
	
	@ExceptionHandler(BadCredentialsException.class)
	@ResponseBody
	  public ResponseEntity<Object> handleBadCredentials (BadCredentialsException ex) {
		Map<String, Object> body = new LinkedHashMap<>();
		
		body.put("timestamp", LocalDate.now());
		body.put("message", "Wachtwoord Verkeerd");
		
		return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);

	}
	
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseBody
	  public ResponseEntity<Object> handleBadCredentials (UserNotFoundException ex) {
		Map<String, Object> body = new LinkedHashMap<>();
		
		body.put("timestamp", LocalDate.now());
		body.put("message", ex.getMessage());
		
		return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);

	}
	
	

}