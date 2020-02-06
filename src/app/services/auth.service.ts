import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;
  usuarios: Usuario[] = [];
  token: string;

  constructor() {
    this.leerToken();
    if (localStorage.getItem('usuarios') === null) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    this.usuarios = JSON.parse(localStorage.getItem('usuarios'));
   }

  // Metodo para agregar un nuevo usuario al localStorage
  // params: Usuario a agregar al localStorage.
  // return: true si el usuario se agregó al localStorage o false si no lo hizo.
  addUsuario(usuario: Usuario): boolean {
    let isAdd: boolean;
    if (this.usuarios.length >= 1 ) {
      this.usuarios.forEach( function(value: Usuario) {
        if (value.correo === usuario.correo) {
          isAdd = true;
        }
      });
      if (isAdd) {
        return false;
      } else {
        this.usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        return true;
      }
    } else {
      this.usuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      return true;
    }
  }

  login(usuario: Usuario) {
    let checkInfo = false;
    if (this.usuarios.length >= 1) {
      this.usuarios.forEach( function(value: Usuario) {
        if (value.correo === usuario.correo && value.password === usuario.password) {
          checkInfo = true;
        }
      });
      if (checkInfo) {
        this.guardarToken(usuario.correo);
      }
    }

    return checkInfo;
  }

  guardarToken(idToken: string) {
    this.token = idToken;
    localStorage.setItem('token', this.token);
  }

  leerToken() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

    return this.token;
  }

  logout() {
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    return this.token.length > 1;
  }

  getUsuario(): Usuario {
    let usuario = this.usuario;
    const correo = localStorage.getItem('token');
    if (this.usuarios.length >= 1) {
      this.usuarios.forEach( function(value: Usuario) {
        if (value.correo === correo) {
          usuario = value;
        }
      });
    }
    return usuario;
  }

  updateHeroesUser(heroe, flat: string): boolean {
    const correo = localStorage.getItem('token');
    let i: number;
    let iHeroes: number;
    let exist = false;
    if (this.usuarios.length >= 1 ) {
      this.usuarios.forEach( function(value: Usuario, index) {
        if (value.correo === correo) {
          i = index;
        }
      });

      if (i >= 0 && flat === 'heroes') {
        this.usuarios[i].heroes.forEach(function(value: any) {
          if (value.id === heroe.id) {
            console.log('Ya existe');
            exist = true;
          }
        });

        if (exist) {
          return false;
        } else {
          this.usuarios[i].heroes.push(heroe);
          localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
          return true;
        }
      } else if (i >= 0 && flat === 'heroesPanel') {
        this.usuarios[i].heroesPanel.forEach(function(value: any) {
          if (value.id === heroe.id) {
            exist = true;
          }
        });

        if (exist) {
          return false;
        } else {
          this.usuarios[i].heroesPanel.push(heroe);
          localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
          return true;
        }
      } else if (i >= 0 && flat === 'delete') {
        this.usuarios[i].heroesPanel.forEach(function(value: any, index) {
          if (value.id === heroe.id) {
            iHeroes = index;
          }
        });
        if (iHeroes >= 0) {
          this.usuarios[i].heroesPanel.splice(iHeroes, 1);
          localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
          return true;
        }
      } else {
        return false;
      }
    }
  }
}
