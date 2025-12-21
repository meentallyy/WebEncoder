import JSEncrypt from 'jsencrypt';

// RSA
export const generateRSAKeys = () => {
    const encrypt = new JSEncrypt({ default_key_size: 2048 });
    return {
        publicKey: encrypt.getPublicKey(),
        privateKey: encrypt.getPrivateKey()
    };
};

export const encodeRSA = (text: string, publicKey: string): string => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(text) || '';
};

export const decodeRSA = (encryptedText: string, privateKey: string): string => {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(encryptedText) || '';
};

// Kuznechik (используем AES как аналог)
export const generateKuznechikKey = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
};

export const encodeKuznechik = async (text: string, key: string): Promise<string> => {
    try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(text);
        
        // Импортируем ключ
        const keyBuffer = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-CBC' },
            false,
            ['encrypt']
        );
        
        // Генерируем IV
        const iv = crypto.getRandomValues(new Uint8Array(16));
        
        // Шифруем
        const encryptedBuffer = await crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            keyBuffer,
            dataBuffer
        );
        
        // Объединяем IV и зашифрованные данные
        const result = new Uint8Array(iv.length + encryptedBuffer.byteLength);
        result.set(iv, 0);
        result.set(new Uint8Array(encryptedBuffer), iv.length);
        
        return Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.error('Ошибка шифрования Кузнечик:', error);
        throw error;
    }
};

export const decodeKuznechik = async (encryptedHex: string, key: string): Promise<string> => {
    try {
        const encoder = new TextEncoder();
        
        // Конвертируем hex в ArrayBuffer
        const encryptedArray = new Uint8Array(
            encryptedHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
        );
        
        // Извлекаем IV (первые 16 байт)
        const iv = encryptedArray.slice(0, 16);
        const data = encryptedArray.slice(16);
        
        // Импортируем ключ
        const keyBuffer = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-CBC' },
            false,
            ['decrypt']
        );
        
        // Дешифруем
        const decryptedBuffer = await crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            keyBuffer,
            data
        );
        
        const decoder = new TextDecoder();
        return decoder.decode(decryptedBuffer);
    } catch (error) {
        console.error('Ошибка дешифрования Кузнечик:', error);
        throw error;
    }
};

// Stribog (хеширование)
export const encodeStribog = async (text: string, bitLength: 256 | 512 = 256): Promise<string> => {
    try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(text);
        
        if (bitLength === 512) {
            const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
            return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        } else {
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }
    } catch (error) {
        console.error('Ошибка хеширования Стрибог:', error);
        throw error;
    }
};

// Универсальные функции для кодирования/декодирования
export const encodeText = async (
    text: string,
    algorithm: string,
    options?: {
        rsaPublicKey?: string;
        kuznechikKey?: string;
    }
): Promise<{ result: string; metadata?: any }> => {
    switch (algorithm) {
        case 'RSA':
            if (!options?.rsaPublicKey) {
                throw new Error('Для RSA необходим открытый ключ');
            }
            return {
                result: encodeRSA(text, options.rsaPublicKey),
                metadata: { algorithm: 'RSA' }
            };
            
        case 'Kuznechik':
            if (!options?.kuznechikKey) {
                throw new Error('Для Кузнечик необходим ключ');
            }
            const kuznechikResult = await encodeKuznechik(text, options.kuznechikKey);
            return {
                result: kuznechikResult,
                metadata: {
                    algorithm: 'Kuznechik',
                    key: options.kuznechikKey
                }
            };
            
        case 'Stribog':
            const stribogResult = await encodeStribog(text, 256);
            return {
                result: stribogResult,
                metadata: {
                    algorithm: 'Stribog',
                    bitLength: 256
                }
            };
            
        default:
            throw new Error(`Алгоритм ${algorithm} не поддерживается`);
    }
};

export const decodeText = async (
    text: string,
    algorithm: string,
    options?: {
        rsaPrivateKey?: string;
        kuznechikKey?: string;
    }
): Promise<{ result: string; metadata?: any }> => {
    switch (algorithm) {
        case 'RSA':
            if (!options?.rsaPrivateKey) {
                throw new Error('Для RSA необходим закрытый ключ');
            }
            return {
                result: decodeRSA(text, options.rsaPrivateKey),
                metadata: { algorithm: 'RSA' }
            };
            
        case 'Kuznechik':
            if (!options?.kuznechikKey) {
                throw new Error('Для Кузнечик необходим ключ');
            }
            const kuznechikResult = await decodeKuznechik(text, options.kuznechikKey);
            return {
                result: kuznechikResult,
                metadata: {
                    algorithm: 'Kuznechik',
                    key: options.kuznechikKey
                }
            };
            
        case 'Stribog':
            throw new Error('Стрибог - хеш-функция, декодирование невозможно');
            
        default:
            throw new Error(`Алгоритм ${algorithm} не поддерживается`);
    }
};