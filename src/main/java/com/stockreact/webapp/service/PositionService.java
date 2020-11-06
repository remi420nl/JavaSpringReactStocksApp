package com.stockreact.webapp.service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import java.util.Optional;

import javax.validation.Valid;

import com.stockreact.webapp.exception.StockAppException;
import com.stockreact.webapp.model.History;
import com.stockreact.webapp.model.Portfolio;
import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.Stock;
import com.stockreact.webapp.model.User;

public interface PositionService {

	
public Position addPosition(User user, @Valid PositionDTO dto);


  	History buildHistory(PositionDTO dto);

	
	public void deleteById(Long id);
}
