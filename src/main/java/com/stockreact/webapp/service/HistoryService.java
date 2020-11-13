package com.stockreact.webapp.service;

import com.stockreact.webapp.model.History;
import com.stockreact.webapp.model.PositionDTO;

public interface HistoryService {

	public History buildHistory(PositionDTO dto);
	
}
