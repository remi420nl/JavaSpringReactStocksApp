package com.stockreact.webapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockreact.webapp.model.History;

@Repository
public interface HistoryRepository extends JpaRepository<History,Long> {

}
