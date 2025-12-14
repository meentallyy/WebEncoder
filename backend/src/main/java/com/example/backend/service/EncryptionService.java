package com.example.backend.service;

// Интерфейс сервиса шифрования/хэширования
public interface EncryptionService {

    /**
     * Обработать текст выбранным алгоритмом
     * @param text - входной текст
     * @param algorithm - название алгоритма (AES, Caesar, Kuznechik, Stribog256, Stribog512)
     * @return результат шифрования или хэширования
     */
    String process(String text, String algorithm);
}
