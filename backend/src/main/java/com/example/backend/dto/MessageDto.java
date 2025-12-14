package com.example.backend.dto;

import java.time.LocalDateTime;

public record MessageDto(
        Long id,
        String algorithm,
        String inputText,
        String resultText,
        LocalDateTime createdAt
) {}
