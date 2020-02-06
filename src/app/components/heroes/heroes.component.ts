import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
declare var $: any; // Para usar en el modal

// Iconos
import { faSearch, faExclamation, faSyncAlt, faSave, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// Services
import { HeroesService } from '../../services/heroes.service';
import { AuthService } from '../../services/auth.service';

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

  buscar: string; // Variable con el nombre del heroe a buscar.
  pagina: number; // Para indicar en cual página se está.
  heroe;
  heroes: [] = []; // Array de heroes traidos de la API
  heroesUser: [] = []; // Array de heroes guardados del usuario.
  heroesPanel: [] = []; // Array los heroes a mostrar en el panel.
  private ngUnsubscribe: Subject<any> = new Subject<any>(); // Para finalizar las subscripciones
  cargando: boolean;

  constructor(private hs: HeroesService, private auth: AuthService) { }

  ngOnInit() {
    this.pagina = 1; // Por defecto estaremos en la página de buscar heroe.
    this.heroesUser = this.auth.getUsuario().heroes; // Se obtienen los heroes que tiene el usuario guardados
    this.heroesPanel = this.auth.getUsuario().heroesPanel; // Heroes que el usuario a decidido mostrar en el panel izquierdo
  }

  // Metodo para buscar heroes usando la API
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
    });
  }

  // Metodo para guardar un heroe
  // params: heroe a guardar
  guardarHeroe(heroe: never) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading(); // Iniciamos el loading.
    if (this.auth.updateHeroesUser(heroe, 'heroes')) {
      Swal.close(); // Cerramos el loading
      Swal.fire({  // Mostramos mensaje de exito
        icon: 'success',
        title: 'Guardado',
        text: 'Heroe guardado correctamente'
      });
    } else {
      Swal.close(); // Cerramos el loading
      Swal.fire({   // Mostramos mensaje de error
        icon: 'error',
        title: 'Error',
        text: 'El heroe ya fue agregado antes.'
      });
    }
  }

  // Metodo para agregar un heroe al panel izquierdo.
  // params: heroe a agregar al panel
  agregarAlPanel(heroe: never) {
    this.auth.updateHeroesUser(heroe, 'heroesPanel');
  }

  // Metodo para eliminar un heroe del panel izquierdo.
  // params: heroe a eliminar del panel izquierdo
  eliminarDelPanel(heroe: never) {
    this.auth.updateHeroesUser(heroe, 'delete');
  }

  // Metodo para abrir el modal.
  // params: heroe a mostrar en el modal.
  abrirModal(heroe) {
    this.heroe = heroe;
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
