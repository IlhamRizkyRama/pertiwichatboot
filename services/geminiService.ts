import { GoogleGenAI } from "@google/genai";
import { FAQItem, AIModel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (
  prompt: string,
  history: { role: string; text: string }[],
  faqs: FAQItem[],
  modelName: AIModel
): Promise<string> => {
  
  // Construct the knowledge base string from FAQs
  const knowledgeBase = faqs.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');

  const systemInstruction = `
    Anda adalah asisten AI yang ramah dan membantu untuk SMK Pertiwi Ciasem.
    Tugas utama anda adalah menjawab pertanyaan siswa, orang tua, dan calon pendaftar.
    
    Gunakan basis pengetahuan (Knowledge Base) berikut untuk menjawab pertanyaan:
    ---
    ${knowledgeBase}
    ---
    
    Panduan Menjawab:
    1. Jika jawaban ada di Knowledge Base, jawablah dengan akurat sesuai informasi tersebut.
    2. Jika pertanyaan terkait sekolah tapi tidak ada di Knowledge Base, jawablah dengan sopan dan sarankan untuk menghubungi pihak sekolah secara langsung, namun coba berikan jawaban umum yang masuk akal jika memungkinkan.
    3. Gunakan Bahasa Indonesia yang baik, sopan, dan mudah dipahami.
    4. Bersikaplah antusias tentang SMK Pertiwi Ciasem.
    5. JANGAN mengarang informasi spesifik (seperti nomor telepon atau biaya spesifik) jika tidak ada di data.
  `;

  try {
    const chat = ai.chats.create({
      model: modelName,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "Maaf, saya tidak dapat memproses permintaan saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};