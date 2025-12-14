package com.example.backend.controller;

import com.example.backend.dto.EncryptionRequest;
import com.example.backend.dto.EncryptionResponse;
import com.example.backend.service.EncryptionService;
import com.example.backend.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/encrypt")
public class EncryptionController {

    private final EncryptionService encryptionService;
    private final MessageService messageService;

    public EncryptionController(EncryptionService encryptionService,
                                MessageService messageService) {
        this.encryptionService = encryptionService;
        this.messageService = messageService;
    }

    /**
     * POST /api/encrypt
     * @param request - текст и алгоритм
     * @param principal - текущий пользователь (из JWT)
     * @return результат шифрования/хэширования
     */
    @PostMapping
    public EncryptionResponse encrypt(@RequestBody EncryptionRequest request, Principal principal) {
        String result = encryptionService.process(request.text(), request.algorithm());

        // Сохраняем в историю сообщений
        messageService.save(principal.getName(), request.text(), result, request.algorithm());

        return new EncryptionResponse(result);
    }
}
