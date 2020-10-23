package com.stockreact.webapp;



import static org.hamcrest.Matchers.any;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.sql.DataSource;

import org.aspectj.lang.annotation.Before;
import org.hamcrest.Matcher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockreact.webapp.controllers.PortfolioController;
import com.stockreact.webapp.controllers.UserController;
import com.stockreact.webapp.model.User;
import com.stockreact.webapp.model.UserDTO;
import com.stockreact.webapp.repository.UserRepository;
import com.stockreact.webapp.service.CustomUserDetailsService;
import com.stockreact.webapp.service.UserService;
import com.stockreact.webapp.util.JwtUtil;

import lombok.AllArgsConstructor;



@WebMvcTest(value = UserController.class)
public class UserControllerTest {
	
	
	
	final String username = "dummy";
	final String firstname = "first";	
	final String lastname = "last";
	final String email = "test@test.com";
	final String password = "1234";
	final String city = "city";


    @MockBean
	private UserService userService;
		
    @MockBean
   	private CustomUserDetailsService userDetailService;
   		
    @MockBean
    private  JwtUtil jwtUtil;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @MockBean
    private UserRepository userRepo;
    
    @MockBean
    DataSource dataSource;
    
    
//    @InjectMocks
//    private UserController userController;
//	
    @Autowired
	private MockMvc mockMvc;

    @Before(value = "")
    public void setUp() throws Exception {
    	
    	
    	
    //mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }
	

	public void shouldRegisterAccount() {
		
		//UserDTO userDto = new UserDTO((long) 5, username, firstname, lastname, password, city, "email", "", "");
	
//		when(controller.register(userDto)).thenReturn(new User());
		
		//assertEquals(HttpStatus.OK,controller.register(userDto));
	}

	@Test
	public void testRegisterMethod() throws Exception {
	
	    when(userService.registerUser(Mockito.any())).thenReturn(new User());

		UserDTO userDto = new UserDTO((long) 1, username, firstname, lastname, password, city, "email", "", "");

		mockMvc.perform(MockMvcRequestBuilders.post("/api/register").contentType(MediaType.APPLICATION_JSON).content(asJsonString(userDto)).accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andDo(print())
		.andExpect(jsonPath("$.username",hasSize(2)));
	}
	
	
	public static String asJsonString(final Object obj) {
		
	    try {
	        final ObjectMapper mapper = new ObjectMapper();
	        final String jsonContent = mapper.writeValueAsString(obj);
	        System.out.println("JSON " + jsonContent);
	        return jsonContent;
	    } catch (Exception e) {
	        throw new RuntimeException(e);
	    }
	}  

}
