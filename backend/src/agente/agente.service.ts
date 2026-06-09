import { Injectable } from '@nestjs/common';

const SYSTEM_PROMPT = `Eres FrenoBot, el asistente inteligente del taller mecánico FRENOMAX.
Ayudas a los usuarios con preguntas sobre servicios del taller, gestión de vehículos, mecánica básica y uso del sistema.
Responde siempre en español, de forma clara y concisa (máximo 3 oraciones por respuesta).
Si no sabes algo específico del negocio, sugiere contactar al administrador.`;

@Injectable()
export class AgenteService {
  async chat(messages: { role: string; content: string }[]) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return { reply: 'FrenoBot no está configurado. Agrega ANTHROPIC_API_KEY al entorno.' };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json() as any;
    const reply = data.content?.map((b: any) => b.text || '').join('') || 'Sin respuesta.';
    return { reply };
  }
}
