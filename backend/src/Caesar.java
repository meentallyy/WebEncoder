import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class Caesar {
    // Английский алфавит
    private static final String ENGLISH_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String ENGLISH_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int ENGLISH_SIZE = 26;

    // Русский алфавит
    private static final String RUSSIAN_LOWER = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    private static final String RUSSIAN_UPPER = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    private static final int RUSSIAN_SIZE = 33;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Шифрование Цезаря");
        System.out.println("=================");

        System.out.println("1 - Шифрование");
        System.out.println("2 - Дешифрование");
        System.out.print("Выберите операцию: ");
        int operation = scanner.nextInt();
        scanner.nextLine(); // очистка буфера

        String inputFile = "C:\\1Encoder\\WebEncoder\\backend\\input.txt";

        String outputFile = "C:\\1Encoder\\WebEncoder\\backend\\output.txt";

        System.out.print("Введите сдвиг: ");
        int shift = scanner.nextInt();

        try {
            // Чтение текста из файла
            String text = readFile(inputFile);

            String result;
            if (operation == 1) {
                // Шифрование
                result = encrypt(text, shift);
            } else {
                // Дешифрование
                result = decrypt(text, shift);
            }

            // Запись результата в файл
            writeFile(outputFile, result);
            System.out.println("Результат сохранен в: " + outputFile);

        } catch (IOException e) {
            System.err.println("Файловая ошибка: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }

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
            // Остальные символы остаются без изменений
            else {
                result.append(character);
            }
        }

        return result.toString();
    }

    private static String readFile(String filePath) throws IOException {
        StringBuilder content = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(filePath), StandardCharsets.UTF_8))) {

            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
                // Не добавляем \n к последней строке
                if (reader.ready()) {
                    content.append("\n");
                }
            }
        }

        return content.toString();
    }

    private static void writeFile(String filePath, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(new FileOutputStream(filePath), StandardCharsets.UTF_8))) {
            writer.write(content);
        }
    }
}