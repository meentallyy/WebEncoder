package com.example.backend.service;

import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Message;

import java.util.List;

public interface MessageService {

    // Сохраняем новое сообщение
    void save(String username, String inputText, String resultText, String algorithm);

    // Получаем историю сообщений пользователя
    List<MessageDto> getUserMessages(String username);
}
