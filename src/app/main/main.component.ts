import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { DetalleContenidoService } from '../servicios/detalle-contenido.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  item: { id: number } | null = null;
  lista: any;

  constructor(private storageService: StorageService, private dataService: ApiDataService, private router: Router, private detalle: DetalleContenidoService) { }

  ngOnInit() {
    this.item = this.storageService.getItem('dataKey');

    if (this.item && this.item.id) {
      this.dataService.getDataContenido(this.item.id).subscribe({
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
  }

  ObtenerDetalle(id: number): void {
    if (this.item && this.item.id) {
      const id_usuario = this.item.id;
      const data = { id_usuario: id_usuario, id_contenido: id };
      this.storageService.setItem('dataContenido', JSON.stringify(data));
      // Asegúrate de que 'dataContenido' coincida con el nombre en el DetalleComponent

      this.router.navigate(['/detalle']);
    } else {
      console.error('item no está definido correctamente');
    }
  }

  ObtenerFavorito(id: number): void {
    if (this.item) {
      const id_usuario = this.item.id;
      const data = { id_usuario: id_usuario };
      this.storageService.setItem('dataFavorito', JSON.stringify(data));
      this.router.navigate(['/favoritos']);
    } else {
      console.error('item no está definido correctamente');
    }

  }

  cambiarConfiguracion(id: number): void {
    if (this.item) {
      const id_usuario = this.item.id;
      const data = { id_usuario: id_usuario };
      this.storageService.setItem('dataConfiguracion', JSON.stringify(data));
      this.router.navigate(['/configuracion']);
    } else {
      console.error('item no está definido correctamente');
    }

  }

  visible(): void {
    const navbarJuegos = document.querySelector('.navbar-juegos') as HTMLElement;

    if (navbarJuegos.style.display === 'none') {
      navbarJuegos.style.display = 'block';
    }
    else {
      navbarJuegos.style.display = 'none';
    }

  }

}
