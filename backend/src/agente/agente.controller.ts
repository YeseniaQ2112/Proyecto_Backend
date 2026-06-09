import { Controller, Post, Body } from '@nestjs/common';
import { AgenteService } from './agente.service';

@Controller('agente')
export class AgenteController {
  constructor(private readonly agenteService: AgenteService) {}

  @Post('chat')
  chat(@Body() body: { messages: { role: string; content: string }[] }) {
    return this.agenteService.chat(body.messages);
  }
}
