import { Component, OnInit } from '@angular/core';
import {DataService } from '../data.service';

import {IconComponent} from  '../icon/icon.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./ordenes.component.css',
   '../../../node_modules/material-design-icons/iconfont/material-icons.css']})

export class OrdenesComponent implements OnInit {

	private ordenes = [];

	constructor(private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit() {
  	console.log('onInit tipos.component');
		this.dataService.getDatas('ordenes').then((response) => {
			var data = response.json();
			this.ordenes = data['ordenes'];
			console.log(this.ordenes);
		}).catch(error => {
     	console.log("error " + error);     	   
  		});
  	}
  }
/*openVerticallyCentered(content) {
     this.modalRef = this.modalService.open(content,{ centered: true });
  }

  private setTipo(nombreTipo, descripcionTipo, idContent){
    this.nombreTipo = nombreTipo;
    this.descripcionTipo = descripcionTipo;
    this.id = idContent;
  }

 private onClickUploadButton(){
   document.getElementById("spinner").style.display = "block";   
   this.dataService.setTipo("ModificarTipo", this.nombreTipo, this.descripcionTipo, this.id).then((response) => {
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

   console.log(this.nombreTipo);
 }

 private onClickSaveButton(){
   console.log('metodo onClickSaveButton');
   document.getElementById("spinner").style.display = "block";   
   this.dataService.setTipo("NuevoTipo", this.nombreTipo, this.descripcionTipo, this.id).then((response) => {
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

   console.log(this.nombreTipo);
 }

}*/