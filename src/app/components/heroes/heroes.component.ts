import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Icono
import { faSearch, faExclamation, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// Services
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {

  faSearch = faSearch; // Icono de busqueda.
  faExclamation = faExclamation; // Icono de exclamación.
  faSyncAlt = faSyncAlt; // Icono que da vueltas al cargar.

  buscar: string;
  pagina: number;
  heroes: [] = [];
  private ngUnsubscribe: Subject<any> = new Subject<any>();
  cargando: boolean;

  constructor(public hs: HeroesService) { }

  ngOnInit() {
    this.pagina = 1;
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
