export class CreateTallerDto {
  nombre_prop: string;
  nro_celular: string;
  tipo_auto: string;
  tipo_trabajo: string;
  hora_atencion: string;
  dia: string;
}

export class UpdateTallerDto extends CreateTallerDto {}
