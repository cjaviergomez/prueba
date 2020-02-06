export class Usuario {
  id?: string;
  nombres?: string;
  correo?: string;
  password?: string;
  heroes?: [];
  heroesPanel?: [];

  constructor() {
    this.heroes = [];
    this.heroesPanel = [];
  }
}
