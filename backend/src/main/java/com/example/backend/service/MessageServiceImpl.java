package com.example.backend.service;

import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Message;
import com.example.backend.entity.User;
import com.example.backend.repository.MessageRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.MessageService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepo;
    private final UserRepository userRepo;

    public MessageServiceImpl(MessageRepository messageRepo, UserRepository userRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void save(String username, String inputText, String resultText, String algorithm) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message();
        message.setUser(user);
        message.setInputText(inputText);
        message.setResultText(resultText);
        message.setAlgorithm(algorithm);
        message.setCreatedAt(LocalDateTime.now());

        messageRepo.save(message);
    }

    @Override
    public List<MessageDto> getUserMessages(String username) {
        return messageRepo.findByUserUsername(username)
                .stream()
                .map(m -> new MessageDto(
                        m.getId(),
                        m.getAlgorithm(),
                        m.getInputText(),
                        m.getResultText(),
                        m.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}
