
// ===== File: RSA32768.java =====
// Класс для работы с RSA: загрузка ключей из файлов, шифрование и расшифровка.
// Этот файл НЕ генерирует ключи — генерация выполняется отдельно KeyGenerator.java.

import java.io.BufferedReader;
import java.io.FileReader;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

public class RSA32768 {

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

    // Демонстрация: загрузка ключей, шифрование и расшифровка маленького числа
    public static void main(String[] args) throws Exception {
        String pubFile = "public.key";
        String privFile = "private.key";

        if (args.length >= 1) pubFile = args[0];
        if (args.length >= 2) privFile = args[1];

        System.out.println("Загрузка публичного ключа из: " + pubFile);
        BigInteger[] pub = loadPublicKey(pubFile);
        BigInteger n = pub[0];
        BigInteger e = pub[1];

        System.out.println("Загрузка приватного ключа из: " + privFile);
        BigInteger[] priv = loadPrivateKey(privFile);
        BigInteger d = priv[1];
        BigInteger p = priv.length > 2 ? priv[2] : null;
        BigInteger q = priv.length > 3 ? priv[3] : null;

        System.out.println("n.bitLength()=" + n.bitLength());

        BigInteger message = new BigInteger("304304304304304304");
        System.out.println("Оригинальное сообщение: " + message);

        BigInteger ciphertext = encrypt(message, e, n);
        System.out.println("Зашифрованное: " + ciphertext);

        BigInteger decrypted;
        if (p != null && q != null) {
            // использование CRT (быстрее)
            decrypted = decryptCRT(ciphertext, p, q, d);
        } else {
            decrypted = decrypt(ciphertext, d, n);
        }
        System.out.println("Расшифрованное: " + decrypted);
    }
}
