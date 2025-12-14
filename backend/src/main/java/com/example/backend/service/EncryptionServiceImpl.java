package com.example.backend.service;

import com.example.backend.crypto.CaesarCipher;
import com.example.backend.crypto.KuznechikCipher;
import com.example.backend.crypto.StribogHash;
import com.example.backend.crypto.RSACipher;
import org.springframework.stereotype.Service;

@Service
public class EncryptionServiceImpl implements com.example.backend.service.EncryptionService {

    private final CaesarCipher caesar;
    private final KuznechikCipher kuznechik;
    private final StribogHash stribog;
    private final RSACipher rsa;

    public EncryptionServiceImpl(CaesarCipher caesar, KuznechikCipher kuznechik, StribogHash stribog, RSACipher rsa) {
        this.caesar = caesar;
        this.kuznechik = kuznechik;
        this.stribog = stribog;
        this.rsa = rsa;
    }

    @Override
    public String process(String text, String algorithm) {
        return switch (algorithm.toLowerCase()) {
            case "caesar" -> caesar.encrypt(text, 18);
            case "kuznechik" -> kuznechik.encrypt(text);
            case "stribog256" -> stribog.encryption256(text);
            case "stribog512" -> stribog.encryption512(text);
            case "rsa" -> rsa.encryption(text);
            default -> throw new IllegalArgumentException("Unknown algorithm: " + algorithm);
        };
    }
}
