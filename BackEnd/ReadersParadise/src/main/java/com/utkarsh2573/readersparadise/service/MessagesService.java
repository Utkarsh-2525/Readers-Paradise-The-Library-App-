package com.utkarsh2573.readersparadise.service;

import com.utkarsh2573.readersparadise.RequestModels.AdminQuestionRequest;
import com.utkarsh2573.readersparadise.dao.MessageRepository;
import com.utkarsh2573.readersparadise.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessagesService {
    private final MessageRepository messageRepository;
    private MessageRepository MessageRepository;

    @Autowired
    public MessagesService(MessageRepository MessageRepository, MessageRepository messageRepository) {
        this.MessageRepository = MessageRepository;
        this.messageRepository = messageRepository;
    }

    public void postMessage(Message MessageRequest, String userEmail) {
        Message message = new Message(MessageRequest.getTitle(), MessageRequest.getQuestion());
        message.setUserEmail(userEmail);
        MessageRepository.save(message);
    }

    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception {
        Optional<Message> message = MessageRepository.findById(adminQuestionRequest.getId());

        if (!message.isPresent())
            throw new Exception("Message not found");

        message.get().setUserEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}
