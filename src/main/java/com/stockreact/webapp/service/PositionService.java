package com.stockreact.webapp.service;

import javax.validation.Valid;

import com.stockreact.webapp.model.Position;
import com.stockreact.webapp.model.PositionDTO;
import com.stockreact.webapp.model.User;

public interface PositionService {

	public Position addOrUpdatePosition(User user, @Valid PositionDTO dto);

	public void deleteById(Long id);
}
