package com.stockreact.webapp.filter;
//package com.stockreact.webapp.filter;
//
//import java.io.IOException;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.stereotype.Component;
//
//
//@Component
//public class AuthenticationEntry  implements AuthenticationEntryPoint {
//
//
//		@Override
//		public void commence(HttpServletRequest request, HttpServletResponse response,
//				AuthenticationException authException) throws IOException, ServletException {
//	
//			 final String expired = (String) request.getAttribute("expired");
//		        System.out.println("expired token in commence " +expired);
//		        if (expired!=null){
//		            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,expired);
//		        
//		        }
//	
//	
//		}
//}
