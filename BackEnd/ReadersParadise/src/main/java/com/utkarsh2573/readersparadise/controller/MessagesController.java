package com.utkarsh2573.readersparadise.controller;

import com.utkarsh2573.readersparadise.RequestModels.AdminQuestionRequest;
import com.utkarsh2573.readersparadise.entity.Message;
import com.utkarsh2573.readersparadise.service.MessagesService;
import com.utkarsh2573.readersparadise.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {
    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token, @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token, @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if (!admin.equals("admin") || admin == null)
            throw new Exception("Administration Page Only!");

        messagesService.putMessage(adminQuestionRequest, userEmail);
    }
}
