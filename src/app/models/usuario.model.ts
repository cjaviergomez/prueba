export class Usuario {
  id?: string;
  nombres?: string;
  correo?: string;
  password?: string;
  heroes?: [];
  constructor() {
    this.heroes = [];
  }
}
