import {Algorithm} from "../store/types.ts"

export const ALGORITHMS: Algorithm[] = [
  { 
    value: 'base64', 
    label: 'Base64', 
    icon: '📝', 
    description: 'Кодирование в текстовый формат', 
  },
  { 
    value: 'RSA', 
    label: 'RSA', 
    icon: '📨', 
    description: 'Шифрование RSA', 
  },
  { 
    value: 'Kuznechic', 
    label: 'Kuznechic', 
    icon: '🦗', 
    description: 'Шифрование kuznechic', 
  },
  { 
    value: 'Stribog', 
    label: 'Stribog', 
    icon: '🔒', 
    description: 'Шифрование stribog', 
  },
  { 
    value: 'hex', 
    label: 'Hexadecimal', 
    icon: '🔡', 
    description: 'Шестнадцатеричное кодирование', 
  },
  { 
    value: 'binary', 
    label: 'Binary', 
    icon: '💻', 
    description: 'Двоичное представление', 
  },
  { 
    value: 'rot13', 
    label: 'ROT13', 
    icon: '🔄', 
    description: 'Шифр Цезаря', 
  }
];