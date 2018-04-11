import { Component, OnInit} from '@angular/core';
import {DataService } from '../data.service';
import {IconComponent} from  '../icon/icon.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css', './clientes.component.css']
})
export class ClientesComponent implements OnInit {

private clientes = [];

  constructor(private dataService: DataService, private modalService: NgbModal) { }


  ngOnInit() {
  	console.log('onInit clientes.component');
		this.dataService.getDatas('clientes').then((response) => {
			var data = response.json();
			this.clientes = data['clientes'];
			console.log(this.clientes);
		});
  }  

  openVerticallyCentered(content) {
    this.modalService.open(content,{ centered: true });
  }

}
