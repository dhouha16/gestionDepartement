import { Injectable } from '@angular/core';
import { ModalComponent } from 'src/app/sharedConfig/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: ModalComponent[] = [];
  constructor() { }
 
}
