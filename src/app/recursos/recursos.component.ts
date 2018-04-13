import { Component, OnInit} from '@angular/core';
import {DataService } from '../data.service';
import {IconComponent} from  '../icon/icon.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
 

@Component({
  selector: 'recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./recursos.component.css',
  '../../../node_modules/material-design-icons/iconfont/material-icons.css']
})
export class RecursosComponent implements OnInit{

	private recursos = [];
	private nombreRecurso;
	private apellidosRecurso;
	private id;
	modalRef;
	private email;
	private clave;

	constructor(private dataService: DataService, private modalService: NgbModal) {}

	emailFormControl = new FormControl('', [
	    Validators.required,
	    Validators.email,
	]);

	passwordFormControl = new FormControl('', [
	    Validators.required
	]);

  	matcher = new MyErrorStateMatcher();  

	ngOnInit(): void {
		console.log('onInit recursos.component');
		this.dataService.getDatas('recursos').then((response) => {
			var data = response.json();
			this.recursos = data['recursos'];
			console.log(this.recursos);  
		});
	}

	openVerticallyCentered(content) {
     this.modalRef = this.modalService.open(content,{ centered: true });
  }

  private setDatasRecurso(nombre, apellidos, idContent, email, clave){
  	this.nombreRecurso = nombre;
  	this.apellidosRecurso = apellidos;
  	this.id = idContent;
  	this.email = email;
  	this.clave = clave;
  }

 	private closeAlert(){
  		document.getElementById('errorDatas').style.display = "none";
	}

  	private onClickUploadButton(){	 	
	 	console.log(this.email);
	 	if (this.email === undefined || this.email ===''){
	 		document.getElementById('errorDatas').style.display = "block";
	 	} else {
	 		document.getElementById("spinner").style.display = "block"; 	
		 	this.dataService.setRecurso("modificarRecurso", this.nombreRecurso, this.apellidosRecurso, this.email, this.id).then((response) => {
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

		 	console.log(this.nombreRecurso);
 		}
	}

 private onClickSaveButton(){
 	document.getElementById("spinner").style.display = "block"; 	
 	this.dataService.setRecurso("NuevoRecurso", this.nombreRecurso, this.apellidosRecurso, this.email, this.id).then((response) => {
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

 	console.log(this.nombreRecurso);
 }

}


