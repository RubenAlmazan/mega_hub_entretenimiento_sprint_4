import { Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/info.service';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-detalle-favorito',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './detalle-favorito.component.html',
  styleUrls: ['./detalle-favorito.component.css']
})
export class DetalleFavoritoComponent implements OnInit {

  item: { id_usuario: number, id_contenido: number } | null = null;
  lista: any;
  idUsuario: number | null = null;
  idContenido: number | null = null;

  constructor(private storageService: StorageService, private dataService: ApiDataService, private router: Router) { }

  ngOnInit() {
    const dataFavorito = this.storageService.getItem('dataDetalleFavorito');
    if (dataFavorito) {
      this.item = JSON.parse(dataFavorito);
      this.idUsuario = this.item?.id_usuario || null;
      this.idContenido = this.item?.id_contenido || null;

      if (this.idContenido) {
        this.dataService.getDataElemento(this.idContenido).subscribe({
          next: (data) => {
            this.lista = data;
          },
          error: (err) => {
            console.error('Error al obtener datos:', err);
          }
        });
      }
    }
  }

  borrarFavorito(id_usuario: any, id_contenido: any): void {
    console.log('->', id_usuario, id_contenido);
    alert('Su película está siendo borrada de tus favoritos');

    of(id_contenido).pipe(
      delay(3000), // Retrasa la emisión del valor en 3 segundos
      tap(() => {
          this.borrarTablaFavorito(id_contenido, id_usuario);
      })
  ).subscribe();

    // Implementar lógica para borrar el favorito aquí
  }

  borrarTablaFavorito(idContenido: any, idUsuario: any): void {
    //console.log('Si se pudo ', idContenido, idUsuario);
    this.dataService.deleteFavorito(idContenido, idUsuario).subscribe({
      next: (response) => {
        //console.log('Registro insertado correctamente:', response);
        alert('El contenido ha sido eliminado correctamente en tus favoritos ')
        this.router.navigate(['/favoritos']); // Navegar al segundo componente

        // Puedes realizar otras acciones aquí si es necesario, como notificar al usuario
      },
      error: (err) => {
        console.error('Error al insertar registro:', err);
        // Puedes manejar errores de forma más específica aquí si es necesario
      }
    });

  }
}
