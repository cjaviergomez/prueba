import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public auth: AuthService, private router: Router) { }

  // Metodo para cerrar sesión de un usuario.
  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
