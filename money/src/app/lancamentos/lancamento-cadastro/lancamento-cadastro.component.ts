import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LancamentoService, LancamentoFiltro } from '../../lancamentos/lancamento-service.service';
import { ErrorHandleService } from '../../core/error-handle.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [
    { label: 'Murilo Fidelis', value: '1' },
    { label: 'Erica Neves', value: '2' },
    { label: 'Maria Silva', value: '3' },
  ];



  constructor(
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService,
    private errorHandle: ErrorHandleService,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);

    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.lancamentoService.listarCategorias()
      .then(categorias => { this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo })); })
      .catch(erro => this.errorHandle.handle(erro));
  }

}
