import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { TallerService } from './taller.service';
import { CreateTallerDto, UpdateTallerDto } from './taller.dto';

@Controller('taller')
export class TallerController {
  constructor(private readonly tallerService: TallerService) {}

  @Get()
  findAll() {
    return this.tallerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tallerService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTallerDto) {
    return this.tallerService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTallerDto) {
    return this.tallerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tallerService.remove(id);
  }
}
