import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Detalhes {
  id: number,
  nomeSenador: string,
  despesas: [
    {
      tipo: number,
      fornec: string,
      ano: number,
      mes: number,
      dia: number,
      valor: number
    }
  ]
}

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  url: string = 'http://localhost:3000/despesasSenadores';
  detalhes: Detalhes[];
  id: string;

  sums = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');

      this.httpClient.get<Detalhes[]>(`${this.url}/${this.id}`).subscribe(data => {
        this.detalhes = data;

        this.sumTypes(1);
        this.sumTypes(2);
        this.sumTypes(3);
        this.sumTypes(4);
        this.sumTypes(5);
        this.sumTypes(6);
        this.sumTypes(7);
      });
    });
  }

  sumTypes(tipo: number) {
    let sum: number = 0;

    for (let despesa of this.detalhes.despesas) {
      if (despesa.tipo == tipo) {
        sum += despesa.valor;
      }
    }

    this.sums.push({
      tipo: tipo,
      valor: sum
    });
  }

  getTotal() {
    let total: number = 0;

    for(let sum of this.sums) {
      total += sum.valor;
    }

    return total;
  }
}
