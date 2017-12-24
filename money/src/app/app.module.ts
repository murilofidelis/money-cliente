import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component, LOCALE_ID } from '@angular/core';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ConfirmationService } from 'primeng/components/common/api';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Routes, RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { CoreModule } from './core/core.module';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from 'app/pessoa/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from 'app/pessoa/pessoa-cadastro/pessoa-cadastro.component';
import { LancamentoServiceService } from './lancamentos/lancamento-service.service';
import { PessoaService } from './pessoa/pessoa.service';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoaPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    LancamentosModule,
    PessoaModule,
    CoreModule
  ],
  providers: [
    LancamentoServiceService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }],

  bootstrap: [AppComponent]
})
export class AppModule { }
