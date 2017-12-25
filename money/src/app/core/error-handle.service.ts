import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandleService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {

    let msg: string;

    if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) { }
      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Ocorreu um erro inesperado.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }
}
