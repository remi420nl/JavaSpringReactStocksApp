package com.stockreact.webapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stockreact.webapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	// Used for registering a new user to check if there already is a record with
	// this username
	@Query("SELECT COUNT(u) FROM User u WHERE u.username =:username")
	int checkUsernameExists(@Param("username") String username);
}
