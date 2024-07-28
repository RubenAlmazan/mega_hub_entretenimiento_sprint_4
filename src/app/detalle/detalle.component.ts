import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StorageService } from '../servicios/info.service';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';  // Asegúrate de importar Router
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  item: { id_usuario: number, id_contenido: number } | null = null;
  private unsubscribe$ = new Subject<void>();
  idContenido: number | null = null;
  idUsuario: number | null = null;
  lista: any[] = [];  // Inicializa la lista o usa el tipo adecuado

  constructor(
    private storageService: StorageService,
    private dataService: ApiDataService,
    private router: Router
  ) { }

  ngOnInit() {
    const storedItem = this.storageService.getItem('dataContenido');
    if (storedItem) {
      this.item = JSON.parse(storedItem);
      this.idContenido = this.item?.id_contenido ?? null;
      this.idUsuario = this.item?.id_usuario ?? null;

      // Mueve la lógica aquí dentro de ngOnInit
      if (this.idContenido) {
        this.dataService.getDataElemento(this.idContenido).subscribe({
          next: (data) => {
            this.lista = data;
          },
          error: (err) => {
            console.error('Error al obtener datos:', err);
          }
        });
      } else {
        console.warn('Item es null o id es undefined:', this.item);
      }
    } else {
      console.error('No se encontraron datos en storage');
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  agregarFavorito(idContenido: any, idUsuario: any): void {
    // Lógica para mostrar un mensaje antes de agregar a favoritos
    alert('Su película está siendo agregada a favoritos');

    of(idContenido).pipe(
      delay(3000), // Retrasa la emisión del valor en 3 segundos
      tap(() => {
          this.insertarTablaFavorito(idContenido, idUsuario);
      })
  ).subscribe();
  
}

insertarTablaFavorito(idContenido: any, idUsuario: any): void {
  //console.log('Si se pudo ', idContenido, idUsuario);
  this.dataService.insertFavorito(idContenido, idUsuario).subscribe({
    next: (response) => {
      console.log('Registro insertado correctamente:', response);
      alert(response.message)
      // Puedes realizar otras acciones aquí si es necesario, como notificar al usuario
    },
    error: (err) => {
      console.error('Error al insertar registro:', err);
      // Puedes manejar errores de forma más específica aquí si es necesario
    }
  });

}

/////////////////

quitarContenido(idContenido: any, idUsuario: any): void {
  // Lógica para hacer tiempo para agregar favoritos
  alert('Su película está siendo eliminada de tu contenido');

    of(idContenido).pipe(
      delay(3000), // Retrasa la emisión del valor en 3 segundos
      tap(() => {
        this.eliminarTablaContenido(idContenido, idUsuario);
      })
  ).subscribe();

}

eliminarTablaContenido(idContenido: any, idUsuario: any): void {
  //console.log('No se pudo ', idContenido, idUsuario);
  this.dataService.deleteContenido(idContenido, idUsuario).subscribe({
    next: (response) => {
      console.log('Registro borrado correctamente:', response);
      alert('Este contenido ha sido eliminado correctamente de tu catalogo')
      this.router.navigate(['/main']); // Navegar al segundo componente
      // Puedes realizar otras acciones aquí si es necesario, como notificar al usuario
    },
    error: (err) => {
      console.error('Error al insertar registro:', err);
      // Puedes manejar errores de forma más específica aquí si es necesario
    }
  });

}


}
