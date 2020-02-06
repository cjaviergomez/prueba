import { Component } from '@angular/core';

import Swal from 'sweetalert2';
// Models
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css', '../login/login.component.css']
})
export class RegistroComponent {

  public usuario: Usuario = new Usuario();

  constructor(private auth: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading(); // Iniciamos el loading.
    if (this.auth.addUsuario(this.usuario)) {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Registro exitoso',
        confirmButtonColor: '#d33'
      });
    } else {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo ya esta en uso. Por favor inicie sesión.',
        confirmButtonColor: '#d33'
      });
    }

  }

}
