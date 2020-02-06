import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;
  usuarios: Usuario[] = [];
  public token: string;

  constructor() {
    this.leerToken();
    this.getLocalStorage();
  }

  // Metodo para agregar un nuevo usuario al localStorage
  // params: Usuario a agregar al localStorage.
  // return: true si el usuario se agregó al localStorage o false si no lo hizo.
  addUsuario(usuario: Usuario): boolean {
    let isAdd: boolean;
    if (this.usuarios.length >= 1 ) {
      // Se recorre el arreglo para validar las credenciales
      this.usuarios.forEach( function(value: Usuario) {
        if (value.correo === usuario.correo) {
          isAdd = true; // Si ya hay un usuario con el correo
        }
      });
      if (isAdd) {
        return false; // Si el correo ya existe retorna false.
      } else {
        this.usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        return true; // Agrega el usuario al localStorage y retorna true.
      }
    } else { // Si no hay usuarios en el localStorage agrega el usuario y retorna true.
      this.usuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      return true;
    }
  }

  // Metodo para saber si un usuario se puede loguear o no.
  // params: Usuario a validar sus credenciales
  // return: true si las credenciales son validos o false en caso contrario.
  login(usuario: Usuario): boolean {
    let checkInfo = false; // Variable para indicar si las credenciales son validas
    if (this.usuarios.length >= 1) {
      // Se recorre el arreglo de usuarios para validar las credenciales
      this.usuarios.forEach( function(value: Usuario) {
        if (value.correo === usuario.correo && value.password === usuario.password) {
          checkInfo = true; // True si las credenciales son correctas
        }
      });
      if (checkInfo) {
        this.guardarToken(usuario.correo); // Guardamos el token(correo) en el localStorage
      }
    }
    return checkInfo; //
  }

  // Metodo para guardar token (correo del usuario activo) en el localStorage
  guardarToken(idToken: string) {
    this.token = idToken;
    localStorage.setItem('token', this.token);
  }

  // Metodo para leer del localStorage el token
  // return: token
  leerToken() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

  // Metodo para eliminar el token del localStorage, esto elimina la sesión del usuario.
  logout() {
    localStorage.removeItem('token');
    this.leerToken();
  }

  // Metodo para saber si hay una sesión activa, es decir si hay un token válido en el localStorage
  estaAutenticado(): boolean {
    return this.token.length > 1;
  }

  // Metodo para saber la información del usuario con sesión activa
  // return: usuario activo
  getUsuario(): Usuario {
    let usuario = this.usuario;
    const correo = localStorage.getItem('token'); // correo del usuario activo
    if (this.usuarios.length >= 1) {
      this.usuarios.forEach( function(value: Usuario) {
        if (value.correo === correo) {
          usuario = value;
        }
      });
    }
    return usuario;
  }

  // Metodo para obtener los usuarios del localStorage
  getLocalStorage() {
    // Si no existe crea uno vacio
    if (localStorage.getItem('usuarios') === null) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    this.usuarios = JSON.parse(localStorage.getItem('usuarios'));
  }

  // Método para actualizar la información de los usuarios.
  // return: true si se actualizó correctamente o falso si no lo hizo.
  updateHeroesUser(heroe, flat: string): boolean {
    const correo = localStorage.getItem('token');
    let i: number;
    let iHeroes: number;
    let exist = false; // Para saber si un heroe ya fue agregado antes
    if (this.usuarios.length >= 1 ) {
      // Para saber cual usuario se va a actualizar
      this.usuarios.forEach( function(value: Usuario, index) {
        if (value.correo === correo) {
          i = index; // Se obtiene el index del usuario
        }
      });
      if (i >= 0 && flat === 'heroes') { // Para agregar heroes al panel central
        this.usuarios[i].heroes.forEach(function(value: any) {
          // Para saber si el heroe a agregar ya existe o no.
          if (value.id === heroe.id) {
            exist = true;
          }
        });

        if (exist) {
          return false; // Si ya existe retorna false
        } else {
          // Si no existe lo agrega y retorna true.
          this.usuarios[i].heroes.push(heroe);
          localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
          return true;
        }
      } else if (i >= 0 && flat === 'heroesPanel') { // Para agregar heroes al panel izquierdo
        this.usuarios[i].heroesPanel.forEach(function(value: any) {
          // Para saber si el heroe a agregar ya existe o no.
          if (value.id === heroe.id) {
            exist = true;
          }
        });
        if (exist) {
          return false;
        } else {
          // Si no existe lo agrega y retorna true.
          this.usuarios[i].heroesPanel.push(heroe);
          localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
          return true;
        }
      } else if (i >= 0 && flat === 'delete') { // Para eliminar un heroe del panel izquierdo
        this.usuarios[i].heroesPanel.forEach(function(value: any, index) {
          // Para saber el index del heroe dentro del array.
          if (value.id === heroe.id) {
            iHeroes = index;
          }
        });
        if (iHeroes >= 0) {
          // Elimina al heroe del panel izquierdo y retorna true.
          this.usuarios[i].heroesPanel.splice(iHeroes, 1);
          localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
          return true;
        }
      } else {
        // Si el arreglo de usuarios esta vacio retorna false.
        return false;
      }
    }
  }
}
