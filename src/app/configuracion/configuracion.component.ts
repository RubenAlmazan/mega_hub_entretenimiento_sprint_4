import { Component } from '@angular/core';
import { StorageService } from '../servicios/info.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ApiDataService } from '../api-data.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {

  constructor(private storageService: StorageService, private dataService: ApiDataService  ) { }
  item: { id_usuario: number, id_contenido: number } | null = null;
  idContenido: number | null = null;
  idUsuario: number | null = null;

  ngOnInit(){
    const storedItem = this.storageService.getItem('dataConfiguracion');
    if(storedItem) {
      this.item = JSON.parse(storedItem);
      this.idUsuario = this.item?.id_usuario ?? null;
      //console.log(this.idUsuario)
    }
  }

  restaurarValores(id: any): void{
    //console.log(id);
    alert('Espere a que se reconfigure su vista de contenidos');

    of(id).pipe(
      delay(3000), // Retrasa la emisión del valor en 3 segundos
      tap(() => {
          this.restaurarTablaEliminado(id);
      })
  ).subscribe();
  }

  restaurarTablaEliminado(idUsuario: any): void {
    //console.log('Si se pudo ', idUsuario);
    this.dataService.resetCatalogo(idUsuario).subscribe({
      next: (response) => {
        console.log('Registro insertado correctamente:', response);
        alert('Su vista de contenidos se ha reconfigurado a su estado inicial');
      },
      error: (err) => {
        console.error('Error al insertar registro:', err);
      }
    });
  
  }
  
}
