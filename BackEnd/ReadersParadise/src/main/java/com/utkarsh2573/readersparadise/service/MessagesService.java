package com.utkarsh2573.readersparadise.service;

import com.utkarsh2573.readersparadise.dao.MessageRepository;
import com.utkarsh2573.readersparadise.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessagesService {
    private MessageRepository MessageRepository;

    @Autowired
    public MessagesService(MessageRepository MessageRepository) {
        this.MessageRepository = MessageRepository;
    }

    public void postMessage(Message MessageRequest, String userEmail) {
        Message message = new Message(MessageRequest.getTitle(), MessageRequest.getQuestion());
        message.setUserEmail(userEmail);
        MessageRepository.save(message);
    }
}
