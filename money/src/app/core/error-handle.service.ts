import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandleService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Ocorreu um erro inesperado.'
      console.log('Ocorreu um erro: ', errorResponse);
    }
    this.toasty.error(msg);
  }

}
