package com.stockreact.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.stockreact.webapp.model.User;

//annotation for auto scanning, component and bean registration
@SpringBootApplication
public class WebappApplication {

	public static void main(String[] args) {
		
	
		SpringApplication.run(WebappApplication.class, args);
	}

}
