import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('taller')
export class Taller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_prop: string;

  @Column()
  nro_celular: string;

  @Column()
  tipo_auto: string;

  @Column()
  tipo_trabajo: string;

  @Column()
  hora_atencion: string;

  @Column()
  dia: string;
}
