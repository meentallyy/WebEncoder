package com.example.backend.crypto;

import java.io.BufferedReader;
import java.io.FileReader;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class RSACipher {

    // Загрузить пары ключей из указанного файла формата key=hex
    private static Map<String, BigInteger> loadKeyFile(String filename) throws Exception {
        Map<String, BigInteger> map = new HashMap<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#")) continue;
                int eq = line.indexOf('=');
                if (eq <= 0) continue;
                String key = line.substring(0, eq).trim();
                String hex = line.substring(eq + 1).trim();
                BigInteger val = new BigInteger(hex, 16);
                map.put(key, val);
            }
        }
        return map;
    }

    // Загрузить публичный ключ из public.key
    public static BigInteger[] loadPublicKey(String publicKeyFile) throws Exception {
        Map<String, BigInteger> m = loadKeyFile(publicKeyFile);
        BigInteger n = m.get("n");
        BigInteger e = m.get("e");
        if (n == null || e == null) throw new IllegalArgumentException("Файл публичного ключа не содержит n или e.");
        return new BigInteger[]{n, e};
    }

    // Загрузить приватный ключ из private.key
    public static BigInteger[] loadPrivateKey(String privateKeyFile) throws Exception {
        Map<String, BigInteger> m = loadKeyFile(privateKeyFile);
        BigInteger n = m.get("n");
        BigInteger d = m.get("d");
        BigInteger p = m.get("p");
        BigInteger q = m.get("q");
        if (n == null || d == null) throw new IllegalArgumentException("Файл приватного ключа не содержит n или d.");
        return new BigInteger[]{n, d, p, q};
    }

    // Шифрование сообщения (BigInteger) публичным ключом (e,n). Сообщение должно быть < n.
    public static BigInteger encrypt(BigInteger message, BigInteger e, BigInteger n) {
        if (message.compareTo(n) >= 0) throw new IllegalArgumentException("Сообщение должно быть меньше модуля n (без паддинга).");
        return message.modPow(e, n);
    }

    // Дешифрование с использованием приватного показателя d
    public static BigInteger decrypt(BigInteger ciphertext, BigInteger d, BigInteger n) {
        return ciphertext.modPow(d, n);
    }

    // Дешифрование с использованием CRT для ускорения (требует p и q)
    // Возвращает m = c^d (mod n) используя CRT: m = (m1 * q * qInv + m2 * p * pInv) mod n
    public static BigInteger decryptCRT(BigInteger ciphertext, BigInteger p, BigInteger q, BigInteger d) {
        BigInteger dP = d.mod(p.subtract(BigInteger.ONE));
        BigInteger dQ = d.mod(q.subtract(BigInteger.ONE));
        BigInteger qInv = q.modInverse(p);

        BigInteger m1 = ciphertext.modPow(dP, p);
        BigInteger m2 = ciphertext.modPow(dQ, q);

        BigInteger h = m1.subtract(m2).multiply(qInv).mod(p);
        BigInteger m = m2.add(h.multiply(q));
        return m;
    }

    public static BigInteger stringToBigIntegerDirect(String text) {
        try {
            // Кодируем в Base64, чтобы сохранить все символы
            String base64 = Base64.getEncoder().encodeToString(
                    text.getBytes(StandardCharsets.UTF_8)
            );

            // Преобразуем Base64 строку в байты
            byte[] bytes = base64.getBytes(StandardCharsets.UTF_8);

            // Создаем BigInteger из байтов
            return new BigInteger(1, bytes);

        } catch (Exception e) {
            throw new RuntimeException("Ошибка при прямом преобразовании", e);
        }
    }
    
    // Демонстрация: загрузка ключей, шифрование и расшифровка маленького числа
    public static String encryption(String message) throws Exception {
        String pubFile = "public.key";
        String privFile = "private.key";


        BigInteger[] pub = loadPublicKey(pubFile);
        BigInteger n = pub[0];
        BigInteger e = pub[1];

        BigInteger[] priv = loadPrivateKey(privFile);
        BigInteger d = priv[1];
        BigInteger p = priv.length > 2 ? priv[2] : null;
        BigInteger q = priv.length > 3 ? priv[3] : null;

        BigInteger ciphertext = stringToBigIntegerDirect(message);
        BigInteger result = encrypt(ciphertext, e, n);
        return result.toString();
    }
}
