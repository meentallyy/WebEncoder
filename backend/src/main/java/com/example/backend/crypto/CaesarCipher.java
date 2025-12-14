package com.example.backend.crypto;

import java.io.*;

public class CaesarCipher {
    // Английский алфавит
    private static final String ENGLISH_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String ENGLISH_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int ENGLISH_SIZE = 26;

    // Русский алфавит
    private static final String RUSSIAN_LOWER = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    private static final String RUSSIAN_UPPER = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    private static final int RUSSIAN_SIZE = 33;


    public static String encrypt(String text, int shift) {
        return processText(text, shift);
    }

    public static String decrypt(String text, int shift) {
        return processText(text, -shift);
    }

    private static String processText(String text, int shift) {
        StringBuilder result = new StringBuilder();

        for (char character : text.toCharArray()) {
            // Английские строчные буквы
            if (ENGLISH_LOWER.indexOf(character) != -1) {
                int originalIndex = ENGLISH_LOWER.indexOf(character);
                int newIndex = (originalIndex + shift) % ENGLISH_SIZE;
                if (newIndex < 0) newIndex += ENGLISH_SIZE;
                result.append(ENGLISH_LOWER.charAt(newIndex));
            }
            // Английские прописные буквы
            else if (ENGLISH_UPPER.indexOf(character) != -1) {
                int originalIndex = ENGLISH_UPPER.indexOf(character);
                int newIndex = (originalIndex + shift) % ENGLISH_SIZE;
                if (newIndex < 0) newIndex += ENGLISH_SIZE;
                result.append(ENGLISH_UPPER.charAt(newIndex));
            }
            // Русские строчные буквы
            else if (RUSSIAN_LOWER.indexOf(character) != -1) {
                int originalIndex = RUSSIAN_LOWER.indexOf(character);
                int newIndex = (originalIndex + shift) % RUSSIAN_SIZE;
                if (newIndex < 0) newIndex += RUSSIAN_SIZE;
                result.append(RUSSIAN_LOWER.charAt(newIndex));
            }
            // Русские прописные буквы
            else if (RUSSIAN_UPPER.indexOf(character) != -1) {
                int originalIndex = RUSSIAN_UPPER.indexOf(character);
                int newIndex = (originalIndex + shift) % RUSSIAN_SIZE;
                if (newIndex < 0) newIndex += RUSSIAN_SIZE;
                result.append(RUSSIAN_UPPER.charAt(newIndex));
            }
            // Все остальные символы остаются без изменений
            else {
                result.append(character);
            }
        }

        return result.toString();
    }
}


