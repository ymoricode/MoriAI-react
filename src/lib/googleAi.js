import { GoogleGenerativeAI } from '@google/generative-ai';

// Ambil API Key dari environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    '⚠️ ERROR: VITE_GEMINI_API_KEY tidak ditemukan! Pastikan sudah diset di .env',
  );
}

let model = null;

try {
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} catch (error) {
  console.error('⚠️ ERROR: Gagal menginisialisasi model Gemini:', error);
}

export default model;
