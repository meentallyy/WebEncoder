import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EncoderState, HistoryItem, Algorithm } from '../types';
import { ALGORITHMS } from '../../config/algorithms.ts';



const initialState : EncoderState = {
    mode: 'encode', // 'encode' | 'decode'
    algorithm: ALGORITHMS[0],
    inputText: '',
    outputText: '',
    isProcessing: false,
    historyRequest: [
    {
        id: 1704067200000,
        timestamp: "2024-01-01T10:30:00.000Z",
        mode: 'encode',
        algorithm: ALGORITHMS[0],
        input: 'Hello World!',
        output: 'SGVsbG8gV29ybGQh',
        success: true
    },
    {
        id: 1704063600000,
        timestamp: "2024-01-01T09:30:00.000Z",
        mode: 'decode',
        algorithm: ALGORITHMS[0],
        input: 'SGVsbG8gV29ybGQh',
        output: 'Hello World!',
        success: true
    },
    {
        id: 1704060000000,
        timestamp: "2024-01-01T08:30:00.000Z",
        mode: 'encode',
        algorithm: ALGORITHMS[6],
        input: 'Hello World!',
        output: 'Hello%20World%21',
        success: true
    },
    {
        id: 1704056400000,
        timestamp: "2024-01-01T07:30:00.000Z",
        mode: 'decode',
        algorithm: ALGORITHMS[5],
        input: 'Hello%20World%21',
        output: 'Hello World!',
        success: true
    },
    {
        id: 1704052800000,
        timestamp: "2024-01-01T06:30:00.000Z",
        mode: 'encode',
        algorithm: ALGORITHMS[3],
        input: 'Test message for encoding',
        output: 'VGVzdCBtZXNzYWdlIGZvciBlbmNvZGluZw==',
        success: true
    },
    {
        id: 1704049200000,
        timestamp: "2024-01-01T05:30:00.000Z",
        mode: 'decode',
        algorithm: ALGORITHMS[2],
        input: 'VGVzdCBtZXNzYWdlIGZvciBlbmNvZGluZw==',
        output: 'Test message for encoding',
        success: true
    },
    {
        id: 1704045600000,
        timestamp: "2025-09-15T04:30:00.000Z",
        mode: 'encode',
        algorithm: ALGORITHMS[1],
        input: 'user@example.com',
        output: 'user%40example.com',
        success: true
    },
    {
        id: 1704042000000,
        timestamp: "2025-10-09T03:30:00.000Z",
        mode: 'decode',
        algorithm: ALGORITHMS[2],
        input: 'user%40example.com',
        output: 'user@example.com',
        success: true
    },
    {
        id: 1704038400000,
        timestamp: "2024-01-01T02:30:00.000Z",
        mode: 'encode',
        algorithm: ALGORITHMS[3],
        input: 'JSON data: {"name":"John","age":30}',
        output: 'SlNPTiBkYXRhOiB7Im5hbWUiOiJKb2huIiwiYWdlIjozMH0=',
        success: true
    },
    {
        id: 1704034800000,
        timestamp: "2024-01-01T01:30:00.000Z",
        mode: 'decode',
        algorithm: ALGORITHMS[4],
        input: 'SlNPTiBkYXRhOiB7Im5hbWUiOiJKb2huIiwiYWdlIjozMH0=',
        output: 'JSON data: {"name":"John","age":30}',
        success: true
    }
],
    error: null
};

const encoderSlice = createSlice({
    name: 'encoder',
    initialState,
    reducers: {
        setMode: (state, action) => {
        
            state.mode = action.payload;
            state.outputText = '';
            state.error = null;
            console.log(state.mode)
        },
        
        setAlgorithm: (state, action : PayloadAction<Algorithm>) => {
            state.algorithm = action.payload;
            // При смене алгоритма пересчитываем результат
            if (state.inputText) {
                state.outputText = '';
                state.error = null;
            }
            console.log(state.algorithm.value)
        },
        
        setInputText: (state, action: PayloadAction<string>) => {
            state.inputText = action.payload;
            state.error = null;
            console.log(state.inputText);
        },
        
        setOutputText: (state, action : PayloadAction<string>) => {
            state.outputText = action.payload;
            state.error = null;
            console.log(state.outputText)
        },
        
        setProcessing: (state, action : PayloadAction<boolean>) => {
            state.isProcessing = action.payload;
            console.log(state.isProcessing)
        },
        
        setError: (state, action : PayloadAction<string|null>) => {
            state.error = action.payload;
            state.isProcessing = false;
        },
        
        addToHistory: (state, action: PayloadAction<Partial<HistoryItem>>) => {
            const historyItem : HistoryItem = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                mode: state.mode,
                algorithm: state.algorithm,
                input: state.inputText.substring(0, 100),
                output: state.outputText.substring(0, 100),
                success: true,
                ...action.payload
            };
        
            state.historyRequest.unshift(historyItem);

            console.log(state.historyRequest.length);
        //   // Ограничиваем историю последними 50 операциями
        //   if (state.history.length > 50) {
        //     state.history = state.history.slice(0, 50);
        //   }

        },
        
        clearHistory: (state) => {
            state.historyRequest = [];
            console.log(state.historyRequest.length);
        },
        
        clearAll: (state) => {
            state.inputText = '';
            state.outputText = '';
            state.error = null;
            state.isProcessing = false;
        },
        
        swapTexts: (state) => {
            if (state.outputText) {
                //state.mode = state.mode === 'encode' ? 'decode' : 'encode';
                state.inputText = state.outputText;
                state.outputText = "";
                state.error = null;
            }
        }
    },
});

export const {
    setMode,
    setAlgorithm,
    setInputText,
    setOutputText,
    setProcessing,
    setError,
    addToHistory,
    clearHistory,
    clearAll,
    swapTexts
} = encoderSlice.actions;

export default encoderSlice.reducer;