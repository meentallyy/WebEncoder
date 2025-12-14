package com.example.backend.controller;

import com.example.backend.dto.MessageDto;
import com.example.backend.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Получение истории сообщений текущего пользователя
    @GetMapping
    public List<MessageDto> getUserMessages(Principal principal) {
        return messageService.getUserMessages(principal.getName());
    }
}
