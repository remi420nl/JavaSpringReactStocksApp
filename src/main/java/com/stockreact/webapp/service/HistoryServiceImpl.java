package com.stockreact.webapp.service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.stockreact.webapp.model.History;
import com.stockreact.webapp.model.PositionDTO;

@Service
public class HistoryServiceImpl implements HistoryService{

	   public History buildHistory(PositionDTO dto) {

		// setting the time format
		DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
				.withLocale(Locale.GERMANY).withZone(ZoneId.systemDefault());

		// actual date and time
		String time = formatter.format(Instant.now());

		//user the statis builder class to build an entity
		History history = History.builder().amount(dto.getAmount()).price(dto.getPrice()).date(time).build();

		return history;
	}
	
}
