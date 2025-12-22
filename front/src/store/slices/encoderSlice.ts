import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALGORITHMS } from '../../config/algorithms.ts';

interface Algorithm {
    value: string;
    label: string;
    description: string;
    icon: string;
}

interface HistoryItem {
    id: string;
    timestamp: string;
    algorithm: string;
    mode: 'encode' | 'decode';
    input: string;
    output: string;
    metadata?: any;
}

interface EncoderState {
    mode: 'encode' | 'decode';
    algorithm: Algorithm;
    inputText: string;
    outputText: string;
    historyRequest: HistoryItem[];
    isProcessing: boolean;
    error: string | null;
    rsaKeys: {
        publicKey: string;
        privateKey: string;
    } | null;
    kuznechikKey: string | null;
    stribogBitLength: 256 | 512;
}

const initialState: EncoderState = {
    mode: 'encode',
    algorithm: ALGORITHMS[0],
    inputText: '',
    outputText: '',
    historyRequest: [],
    isProcessing: false,
    error: null,
    rsaKeys: null,
    kuznechikKey: null,
    stribogBitLength: 256
};

const encoderSlice = createSlice({
    name: 'encoder',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<'encode' | 'decode'>) => {
            state.mode = action.payload;
        },
        setAlgorithm: (state, action: PayloadAction<Algorithm>) => {
            state.algorithm = action.payload;
            state.error = null;
        },
        setInputText: (state, action: PayloadAction<string>) => {
            state.inputText = action.payload;
        },
        setOutputText: (state, action: PayloadAction<string>) => {
            state.outputText = action.payload;
        },
        setProcessing: (state, action: PayloadAction<boolean>) => {
            state.isProcessing = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addToHistory: (state, action: PayloadAction<Omit<HistoryItem, 'id' | 'timestamp'>>) => {
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...action.payload
            };
            state.historyRequest.unshift(newItem);
            if (state.historyRequest.length > 50) {
                state.historyRequest.pop();
            }
        },
        clearHistory : (state)=>{

        },
        clearAll: (state) => {
            state.inputText = '';
            state.outputText = '';
            state.error = null;
        },
        swapTexts: (state) => {
            [state.inputText, state.outputText] = [state.outputText, state.inputText];
        },
        setRSAKeys: (state, action: PayloadAction<{ publicKey: string; privateKey: string }>) => {
            state.rsaKeys = action.payload;
        },
        setKuznechikKey: (state, action: PayloadAction<string>) => {
            state.kuznechikKey = action.payload;
        },
        setStribogBitLength: (state, action: PayloadAction<256 | 512>) => {
            state.stribogBitLength = action.payload;
        },
        generateRSAKeys: (state) => {
            // Это действие теперь просто триггер, генерация будет в компоненте
            // Оставляем состояние как есть, компонент обновит его через setRSAKeys
        },
        generateKuznechikKey: (state) => {
            // Это действие теперь просто триггер, генерация будет в компоненте
            // Оставляем состояние как есть, компонент обновит его через setKuznechikKey
        }
    }
});

export const {
    setMode,
    setAlgorithm,
    setInputText,
    setOutputText,
    setProcessing,
    setError,
    addToHistory,
    clearAll,
    swapTexts,
    setRSAKeys,
    setKuznechikKey,
    setStribogBitLength,
    generateRSAKeys,
    clearHistory,
    generateKuznechikKey
} = encoderSlice.actions;

export default encoderSlice.reducer;