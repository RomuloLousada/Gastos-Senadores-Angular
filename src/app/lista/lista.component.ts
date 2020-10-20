import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Senador {
  id: number,
  nomeSenador: string
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  url: string = 'http://localhost:3000/senadores';
  senadores: Senador[];

  constructor(private httpClient: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.httpClient.get<Senador[]>(this.url).subscribe(data => {
      this.senadores = data;
    });
  }

  goToDetails(id: number) {
    this.route.navigate(['despesasSenadores', id]);
  }

}
