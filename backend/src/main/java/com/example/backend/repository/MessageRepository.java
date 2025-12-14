package com.example.backend.repository;

import com.example.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // Получить все сообщения конкретного пользователя
    List<Message> findByUserUsername(String username);
}
