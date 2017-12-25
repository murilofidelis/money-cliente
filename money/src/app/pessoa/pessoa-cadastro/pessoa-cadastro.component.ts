import { FormControl } from '@angular/forms';
import { Pessoa } from './../../model/model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from './../../pessoa/pessoa.service';

import { ErrorHandleService } from '../../core/error-handle.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandle: ErrorHandleService,
    private toasty: ToastyService) { }


  salvar(form: FormControl) {
    this.pessoaService.salvarPessoa(this.pessoa).then(() => {
      this.toasty.success('Pessoa salva com sucesso!');
      form.reset();
      this.pessoa = new Pessoa();
    }).catch(erro => this.errorHandle.handle(erro));
  }
}
