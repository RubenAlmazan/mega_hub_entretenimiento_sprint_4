import { Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/info.service';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  item: { id_usuario: number } | null = null;
  lista: any;

  constructor(private storageService: StorageService, private dataService: ApiDataService, private router: Router) { }

  ngOnInit(): void {
    const dataFavorito = this.storageService.getItem('dataFavorito');
    if (dataFavorito) {
      this.item = JSON.parse(dataFavorito);
      console.log(this.item?.id_usuario); // Accede a id_usuario
    } 

    if (this.item) {
      this.dataService.getFavorito(this.item.id_usuario).subscribe({
        next: (data) => {
          this.lista = data;
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    } 
  }

  ObtenerDetalleFavorito(id: number): void{
    if (this.item) {
      const id_usuario = this.item.id_usuario;
      //console.log(id, id_usuario);
      const data = { id_usuario: id_usuario, id_contenido: id };
      this.storageService.setItem('dataDetalleFavorito', JSON.stringify(data));
      // Asegúrate de que 'dataContenido' coincida con el nombre en el DetalleComponent

      this.router.navigate(['/detalle_favorito']);
    } else {
      console.error('item no está definido correctamente');
    }
  }

}
