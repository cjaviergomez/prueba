import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroeImagen'
})
export class HeroeImagenPipe implements PipeTransform {

  transform(heroe: any): any {

    if (heroe.thumbnail.path) {
      return heroe.thumbnail.path + '.jpg';
    } else {
      return '../../assets/img/no-image.png';
    }
  }

}
