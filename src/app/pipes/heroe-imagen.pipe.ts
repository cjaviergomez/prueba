import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroeImagen'
})
export class HeroeImagenPipe implements PipeTransform {

  transform(heroe: any): any {

    if (heroe.thumbnail.path) {
      return heroe.thumbnail.path + '.' + heroe.thumbnail.extension;
    } else {
      return '../../assets/img/no-image.png';
    }
  }

}
