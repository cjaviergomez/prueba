import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  islogin: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.leerToken();
  }

  leerToken() {
    this.islogin = false;
    if (this.auth.leerToken() !== '') {
      this.islogin = true;
    }
  }
  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);

  }

}
