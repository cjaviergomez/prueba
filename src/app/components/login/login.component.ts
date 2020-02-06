import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// Models
import { Usuario } from '../../models/usuario.model';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public usuario: Usuario = new Usuario();

  constructor(private auth: AuthService, private router: Router) { }

  // Metodo para loguearse
  onSubmit(form: NgForm){
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading(); // Iniciamos el loading.
    if (this.auth.login(this.usuario)) { // Si se loguea correctamente se redireje a la página de héroes
      Swal.close();
      this.router.navigate(['/heroes']);
    } else {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Datos incorrectos',
        confirmButtonColor: '#d33'
      });
    }
  }

}
