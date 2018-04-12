import { Component, OnInit} from '@angular/core';
import {DataService } from '../data.service';
import {IconComponent} from  '../icon/icon.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css', './clientes.component.css',
  '../../../node_modules/material-design-icons/iconfont/material-icons.css']
})
export class ClientesComponent implements OnInit {

private clientes = [];
private cliente;
private id;
modalRef;

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
     this.modalRef = this.modalService.open(content,{ centered: true });
  }

  private setNameCliente(content, idContent){
  	this.cliente = content;
  	this.id = idContent;
  }

 private onClickUploadButton(){
 	document.getElementById("spinner").style.display = "block"; 	
 	this.dataService.setDatas("ModificarCliente", this.cliente, this.id).then((response) => {
 		var data = response.json();
 		if(data.status == 'ok'){
 			this.modalRef.close();
 			this.ngOnInit();
 		} else {
 			console.log("ha habido un error");
 			document.getElementById("alert").style.display = "block";
 		}
 		
 	}).catch(error => {
 		console.log("error " + error);
 		document.getElementById("spinner").style.display = "none"; 	
 		document.getElementById("alert").style.display = "block";
 	});

 	console.log(this.cliente);
 }

 private onClickSaveButton(){
 	document.getElementById("spinner").style.display = "block"; 	
 	this.dataService.setDatas("NuevoCliente", this.cliente, this.id).then((response) => {
 		var data = response.json();
 		if(data.status == 'ok'){
 			this.modalRef.close();
 			this.ngOnInit();
 		} else {
 			console.log("ha habido un error");
 			document.getElementById("alert").style.display = "block";
 		}
 		
 	}).catch(error => {
 		console.log("error " + error);
 		document.getElementById("spinner").style.display = "none"; 	
 		document.getElementById("alert").style.display = "block";
 	});

 	console.log(this.cliente);
 }

}
