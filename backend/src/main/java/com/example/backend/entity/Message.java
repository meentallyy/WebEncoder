package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String algorithm; // например: AES, Caesar, Kuznechik, Stribog

    @Lob
    private String inputText; // исходное сообщение

    @Lob
    private String resultText; // зашифрованное или хэшированное

    private LocalDateTime createdAt; // дата создания

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // пользователь, который отправил сообщение
}
