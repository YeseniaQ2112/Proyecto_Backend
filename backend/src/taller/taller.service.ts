import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './taller.entity';
import { CreateTallerDto, UpdateTallerDto } from './taller.dto';

@Injectable()
export class TallerService {
  constructor(
    @InjectRepository(Taller)
    private tallerRepository: Repository<Taller>,
  ) {}

  findAll(): Promise<Taller[]> {
    return this.tallerRepository.find();
  }

  async findOne(id: number): Promise<Taller> {
    const taller = await this.tallerRepository.findOne({ where: { id } });
    if (!taller) throw new NotFoundException(`Taller con id ${id} no encontrado`);
    return taller;
  }

  create(dto: CreateTallerDto): Promise<Taller> {
    const taller = this.tallerRepository.create(dto);
    return this.tallerRepository.save(taller);
  }

  async update(id: number, dto: UpdateTallerDto): Promise<{ message: string }> {
    await this.findOne(id);
    await this.tallerRepository.update(id, dto);
    return { message: 'Se actualizó correctamente' };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.tallerRepository.delete(id);
    return { message: 'Se eliminó correctamente' };
  }
}
