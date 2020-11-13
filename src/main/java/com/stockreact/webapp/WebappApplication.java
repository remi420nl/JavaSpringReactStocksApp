package com.stockreact.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.stockreact.webapp.model.User;

//Eindopdracht Remi Peerlings
//Java Spring MVC API
//Novi 2020

//Annotation for auto scanning, component and bean registration
@SpringBootApplication
public class WebappApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(WebappApplication.class, args);
	}

}
