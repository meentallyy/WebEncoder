import {Algorithm} from "../store/types.ts"

export const ALGORITHMS = [
    {
        value: 'Stribog',
        label: 'Стрибог',
        description: 'Российский алгоритм хеширования (GOST R 34.11-2012)',
        icon: '🔐'
    },
    {
        value: 'RSA',
        label: 'RSA',
        description: 'Асимметричное шифрование с открытым ключом',
        icon: '🔑'
    },
    {
        value: 'Kuznechik',
        label: 'Кузнечик',
        description: 'Российский симметричный блочный шифр (ГОСТ Р 34.12-2015)',
        icon: '🦗'
    },
    {
        value: 'Base64',
        label: 'Base64',
        description: 'Кодирование в base64',
        icon: '📄'
    },
    {
        value: 'URL',
        label: 'URL',
        description: 'URL кодирование',
        icon: '🌐'
    },
    {
        value: 'Caesar',
        label: 'Шифр Цезаря',
        description: 'Простой шифр замены',
        icon: '🏛️'
    }
];