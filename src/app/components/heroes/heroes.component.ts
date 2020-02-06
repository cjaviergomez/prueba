import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var $: any;
// Icono
import { faSearch, faExclamation, faSyncAlt, faSave, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// Services
import { HeroesService } from '../../services/heroes.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {

  faSearch = faSearch; // Icono de busqueda.
  faExclamation = faExclamation; // Icono de exclamación.
  faSyncAlt = faSyncAlt; // Icono que da vueltas al cargar.
  faSave = faSave; // Icono de guardar
  faPlus = faPlus; // Icono de más ( + )
  faMinus = faMinus; // Icono de menos ( - )

  buscar: string;
  pagina: number;
  heroe;
  heroes: [] = []; // Array de heroes traidos de la API
  heroesUser: [] = []; // Array de heroes guardados del usuario.
  heroesPanel: [] = []; // Array los heroes a mostrar en el panel.
  private ngUnsubscribe: Subject<any> = new Subject<any>();
  cargando: boolean;

  constructor(private hs: HeroesService, private auth: AuthService) { }

  ngOnInit() {
    this.pagina = 1;
    this.heroesUser = this.auth.getUsuario().heroes;
    this.heroesPanel = this.auth.getUsuario().heroesPanel;
  }

  buscarHeroe() {
    if (typeof this.buscar === 'undefined' || this.buscar === '') {
      return;
    }
    this.cargando = true;
    this.hs.getCharacters(this.buscar)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.heroes = data;
          this.cargando = false;
          console.log(data);
    });
  }

  guardarHeroe(heroe: never) {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading(); // Iniciamos el loading.
    if (this.auth.updateHeroesUser(heroe, 'heroes')) {

      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Heroe guardado correctamente'
      });
    } else {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El heroe ya fue agregado antes.'
      });
    }
  }

  agregarAlPanel(heroe: never) {
    this.auth.updateHeroesUser(heroe, 'heroesPanel');
  }

  eliminarDelPanel(heroe: never) {
    this.auth.updateHeroesUser(heroe, 'delete');
  }

  abrirModal(heroe) {
    this.heroe = heroe;
    console.log(this.heroe);
    $('#Modal').modal('show');
  }

  /**
   * Este metodo se ejecuta cuando el componente se destruye
   * Usamos este método para cancelar todos los observables.
   */
  ngOnDestroy(): void {
    // End all subscriptions listening to ngUnsubscribe
    // to avoid memory leaks.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
