// ===== File: KeyGenerator.java =====
// Генерация RSA-ключей (модульного размера задаётся при запуске).
// Сохраняет публичные и приватные компоненты в файлы public.key и private.key
// Формат файлов: простые ключ=hex

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.security.SecureRandom;

public class KeyGenerator {
    // Источник криптографически стойкой случайности
    private static final SecureRandom secureRandom = new SecureRandom();
    // Публичная экспонента по умолчанию
    private static final BigInteger DEFAULT_E = BigInteger.valueOf(65537L);

    // Набор небольших простых чисел для быстрой фильтрации кандидатов
    private static final int[] SMALL_PRIMES = {
            3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,
            79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,
            181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293
    };

    // Генерация случайного нечётного кандидата точно указанной битовой длины
    private static BigInteger randomOddCandidate(int bits, SecureRandom rnd) {
        BigInteger candidate = new BigInteger(bits, rnd);
        // Установим старший бит, чтобы гарантировать точную длину
        candidate = candidate.setBit(bits - 1);
        // Сделаем нечётным (установим младший бит)
        candidate = candidate.setBit(0);
        return candidate;
    }

    // Вероятностный тест простоты Миллера-Рабина
    private static boolean isProbablePrime(BigInteger n, int rounds, SecureRandom rnd) {
        if (n.compareTo(BigInteger.TWO) < 0) return false;
        // Быстрая проверка делимости малыми простыми
        for (int p : SMALL_PRIMES) {
            BigInteger bp = BigInteger.valueOf(p);
            if (n.equals(bp)) return true;
            if (n.mod(bp).equals(BigInteger.ZERO)) return false;
        }

        BigInteger nMinus1 = n.subtract(BigInteger.ONE);
        int s = nMinus1.getLowestSetBit(); // число множителей 2 в n-1
        BigInteger d = nMinus1.shiftRight(s); // d нечётно

        for (int i = 0; i < rounds; i++) {
            BigInteger a;
            do {
                a = new BigInteger(n.bitLength(), rnd);
            } while (a.compareTo(BigInteger.TWO) < 0 || a.compareTo(nMinus1) >= 0);

            BigInteger x = a.modPow(d, n);
            if (x.equals(BigInteger.ONE) || x.equals(nMinus1)) continue;

            boolean found = false;
            for (int r = 1; r < s; r++) {
                x = x.multiply(x).mod(n);
                if (x.equals(nMinus1)) {
                    found = true;
                    break;
                }
            }
            if (!found) return false; // составное
        }
        return true; // вероятно простое
    }

    // Генерация простого числа заданной битовой длины
    private static BigInteger generateLargePrime(int bits, int roundsForMR, SecureRandom rnd) {
        while (true) {
            BigInteger candidate = randomOddCandidate(bits, rnd);
            boolean divisibleBySmall = false;
            for (int p : SMALL_PRIMES) {
                if (candidate.mod(BigInteger.valueOf(p)).equals(BigInteger.ZERO)) {
                    divisibleBySmall = true;
                    break;
                }
            }
            if (divisibleBySmall) continue;

            if (isProbablePrime(candidate, roundsForMR, rnd)) return candidate;
            // иначе пробуем новый кандидат
        }
    }

    // Генерация пары ключей RSA: возвращает массив [n, e, d, p, q]
    public static BigInteger[] generateRSAKeypair(int modulusBits, int mrRounds) {
        if (modulusBits % 2 != 0) throw new IllegalArgumentException("Используйте чётное число бит для равного деления p и q.");
        int primeBits = modulusBits / 2;

        System.out.println("Генерация простого p (" + primeBits + " бит)...");
        BigInteger p = generateLargePrime(primeBits, mrRounds, secureRandom);
        System.out.println("p сгенерирован.");

        BigInteger q;
        do {
            System.out.println("Генерация простого q (" + primeBits + " бит)...");
            q = generateLargePrime(primeBits, mrRounds, secureRandom);
            System.out.println("q сгенерирован.");
        } while (q.equals(p));

        BigInteger n = p.multiply(q);
        BigInteger phi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));

        BigInteger e = DEFAULT_E;
        if (!e.gcd(phi).equals(BigInteger.ONE)) {
            e = BigInteger.valueOf(3);
            while (!e.gcd(phi).equals(BigInteger.ONE)) e = e.add(BigInteger.TWO);
        }

        BigInteger d = e.modInverse(phi);

        return new BigInteger[]{n, e, d, p, q};
    }

    // Сохранение ключей в файл в формате key=value (hex)
    private static void saveKeyComponents(BigInteger n, BigInteger e, BigInteger d, BigInteger p, BigInteger q) throws IOException {
        try (PrintWriter pub = new PrintWriter(new FileWriter("public.key"))) {
            pub.println("n=" + n.toString(16));
            pub.println("e=" + e.toString(16));
        }
        try (PrintWriter priv = new PrintWriter(new FileWriter("private.key"))) {
            priv.println("n=" + n.toString(16));
            priv.println("d=" + d.toString(16));
            priv.println("p=" + p.toString(16));
            priv.println("q=" + q.toString(16));
        }
        System.out.println("Ключи сохранены в файлы public.key и private.key (hex).\nНе забудьте защитить private.key!");
    }

    // main: запуск генерации; параметры: [bits] [mrRounds]
    public static void main(String[] args) throws Exception {
        int modulusBits = 32768; // по умолчанию RSA-32768
        int mrRounds = 64;       // по умолчанию число раундов MR

        if (args.length >= 1) modulusBits = Integer.parseInt(args[0]);
        if (args.length >= 2) mrRounds = Integer.parseInt(args[1]);

        System.out.println("Запуск генератора RSA-ключей: modulusBits=" + modulusBits + ", MR rounds=" + mrRounds);
        BigInteger[] keys = generateRSAKeypair(modulusBits, mrRounds);

        BigInteger n = keys[0];
        BigInteger e = keys[1];
        BigInteger d = keys[2];
        BigInteger p = keys[3];
        BigInteger q = keys[4];

        System.out.println("Генерация завершена. n.bitLength()=" + n.bitLength());
        saveKeyComponents(n, e, d, p, q);
    }
}

