import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Jsonp, URLSearchParams } from '@angular/http'; 
import 'rxjs/add/operator/map';  
import { Observable } from 'rxjs/Observable';

import {Parte} from './parte';



@Injectable()

export class DataService {

	constructor(private jsonp: Jsonp) { }  

  	private Url = 'http://savia.byethost10.com/SaviaAdmin/consultaTotalPartes.php?callback=JSONP_CALLBACK';

  	Result:Parte[];
  	resultado;
    order;

    

  	private handleError(error: any): Promise<any> {
  		console.error('An error occurred', error); // for demo purposes only
  		return Promise.reject(error.message || error);
	}

  	getPartes():Observable<Parte[]>{

  		let params = new URLSearchParams();
  		
  		params.set('callback', 'JSONP_CALLBACK');

      	return this.jsonp
        .get(this.Url)        
        .map(response => this.Result = response.json());
  	}

    getFilterPartesRecurso(data:Parte[],recurso:string){
      var partes = [];

      var Recurso = data['recursos'].find(fd=>fd.nombreRecurso === recurso);
      var idRecurso = Recurso.idRecurso;
      partes.push(data['partes'].filter(ft=>ft.recursoParte === idRecurso));
      return partes;
    }

    getFilterPartesTipo(data:Parte[],tipo:string){
      var partes = [];

      var Tipo = data['tipoParte'].find(fd=>fd.descripcionTipo === tipo);
      var idTipo = Tipo.idTipo;
      partes.push(data['partes'].filter(ft=>ft.tipoParte === idTipo));
      return partes;
    }

    getFilterPartesCliente(data:Parte[],cliente:string){
      var partes = [];

      var Cliente = data['clientes'].find(fd=>fd.nombreCliente === cliente);
      var idCliente = Cliente.idCliente;
      partes.push(data['partes'].filter(ft=>ft.clienteParte === idCliente));
      return partes;
    }

  	getPartesPorCliente(data:Parte[], filtro:string, valor:string){
  		var partes = [];
      var datas = [];
      var datos;
  		partes['partes'] = new Array();
  		partes['labels'] = new Array();
      partes['totalPartes'] = new Array();
      switch (filtro) {

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(data['partes']
              .filter(ft=>ft.clienteParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
          }
        break;

        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(data['partes']
              .filter(ft=>ft.recursoParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.descripcionTipo===valor).idTipo;
          datas.push(data['partes']
            .filter(ft=>ft.tipoParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
          }
        break;

        default:
          for(let i in data['clientes']){        
            partes['partes'].push(Object.keys(data['partes']
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
            partes['labels'].push(data['clientes'][i].nombreCliente);
          }
          break;
      }

      for(let i in data['clientes']){
            partes['labels'].push(data['clientes'][i].nombreCliente);
          }
      return partes; 
  	}

  	getPartesPorRecurso(data:Parte[], filtro:string, valor:string){
      var partes = [];
      var datas = [];
      var datos;
      partes['partes'] = new Array();
      partes['labels'] = new Array();
      switch (filtro) {        
        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(data['partes']
              .filter(ft=>ft.recursoParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.descripcionTipo===valor).idTipo;
          datas.push(data['partes']
            .filter(ft=>ft.tipoParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(data['partes']
            .filter(ft=>ft.clienteParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;


        default:
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(data['partes']
            .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;
        }
        for(let i in data['recursos']){
            partes['labels'].push(data['recursos'][i].nombreRecurso);
        }
      return partes;       
  	}

  	getPartesPortipo(data:Parte[], filtro:string, valor:string){
  		var partes = [];
      var datas = [];
      var datos;
      partes['partes'] = new Array();
      partes['labels'] = new Array();
      
      switch (filtro) {

        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(data['partes']
              .filter(ft=>ft.recursoParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.descripcionTipo===valor).idTipo;
          datas.push(data['partes']
            .filter(ft=>ft.tipoParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(data['partes']
            .filter(ft=>ft.clienteParte === datos));
          partes['totalPartes'] = datas;
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;


        default:
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(data['partes']
            .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;
        }
        for(let i in data['tipoParte']){
            partes['labels'].push(data['tipoParte'][i].descripcionTipo);
        }
      return partes;     
  	}

    getConversRecursos(datas:Parte[], recurso:string){
      var datos;
      datos= datas['recursos'].find(ft=>ft.idRecurso===recurso).nombreRecurso;
      return datos;
    }

    getConversClientes(datas:Parte[], cliente:string){
      var datos;

      datos = datas['clientes'].find(ft=>ft.idCliente===cliente).nombreCliente;
      return datos;
    }

    getConversTipos(datas:Parte[], tipo:string){
      var datos;

      datos = datas['tipoParte'].find(ft=>ft.idTipo===tipo).descripcionTipo;
      return datos;
    }
}
  		