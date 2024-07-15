package com.utkarsh2573.readersparadise.dao;

import com.utkarsh2573.readersparadise.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {}
