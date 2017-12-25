import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';

import { LancamentoService, LancamentoFiltro } from '../../lancamentos/lancamento.service';
import { PessoaService } from './../../pessoa/pessoa.service';
import { Lancamento } from './../../model/model';
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
  lancamento = new Lancamento();

  constructor(
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private errorHandle: ErrorHandleService,
    private toasty: ToastyService
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
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

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  salvarLancamento(form: FormControl) {
    this.lancamentoService.salvarLancamento(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento salvo com sucesso!');
        form.reset();
        this.lancamento = new Lancamento();
      }).catch(erro => this.errorHandle.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.toasty.success('Lançamento alterado com sucesso!');
      }).catch(erro => this.errorHandle.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.salvarLancamento(form);
    }
  }
}
