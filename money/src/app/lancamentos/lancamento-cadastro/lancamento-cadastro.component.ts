import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LancamentoService, LancamentoFiltro } from '../../lancamentos/lancamento-service.service';
import { PessoaService } from './../../pessoa/pessoa.service';
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
  pessoas = [];

  constructor(
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private errorHandle: ErrorHandleService,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.lancamentoService.listarCategorias()
      .then(categorias => { this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo })); })
      .catch(erro => this.errorHandle.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarPessoas()
      .then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      }).catch(erro => this.errorHandle.handle(erro));
  }

}
