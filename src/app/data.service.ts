import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Jsonp, URLSearchParams } from '@angular/http'; 
import 'rxjs/add/operator/map';  
import { Observable } from 'rxjs/Observable';

import {Parte} from './parte';

import 'rxjs/add/operator/toPromise';

import {HttpModule, Http, Response} from '@angular/http';  




@Injectable()

export class DataService {  

  Result:Parte[];
    resultado;
    order;
    partes = [];

	constructor(private jsonp: Jsonp, private http:Http) {
    this.Result = [];
   }  

  	private Url = 'http://savia.byethost10.com/SaviaAdmin/consultaTotalPartes.php?callback=JSONP_CALLBACK';    

  	/*private handleError(error: any): Promise<any> {
  		console.error('An error occurred', error); // for demo purposes only
  		return Promise.reject(error.message || error);
	}*/

  	//getPartes():Observable<Parte[]>{
    getPartes(){
      var data;
      let params = new URLSearchParams();
      console.log('metodo getPartes');
    return this.jsonp.get(this.Url).toPromise()
                /*then((response) => data = response.json());

                return data;
        /*.map((response: any) =>
          response.json()
        ).toPromise();
        //console.log(promise);
    //return promise;  

  		/*let params = new URLSearchParams();
  		
  		params.set('callback', 'JSONP_CALLBACK');

      	return this.jsonp
        .get(this.Url)        
        .map(response => this.Result = response.json());*/
  	}

    getFilterPartesRecurso(originalDatas:Parte[], data:Parte[],recurso:string){
      var partes = [];
      console.log(originalDatas);
      var Recurso = originalDatas['recursos'].find(fd=>fd.nombreRecurso === recurso);
      var idRecurso = Recurso.idRecurso; 
      partes.push(data.filter(ft=>ft.recursoParte === recurso));
      console.log(partes);
      for (let i in partes[0]){
        var cliente = originalDatas['clientes'].find(fd=>fd.nombreCliente === partes[0][i]['clienteParte']);
        var idCliente = cliente.idCliente;
        var descripcionTipo = originalDatas['tipoParte'].find(fd=>fd.nombreTipo === partes[0][i]['tipoParte']);
        console.log(descripcionTipo);
        var idTipo = descripcionTipo.idTipo;
        partes[0][i]['recursoParte'] = idRecurso;
        partes[0][i]['clienteParte'] = idCliente;
        partes[0][i]['tipoParte'] = idTipo;
      }
      return partes;
    }

    getFilterPartesTipo(originalDatas:Parte[], data:Parte[],tipo:string){
      var partes = [];

      var Tipo = originalDatas['tipoParte'].find(fd=>fd.nombreTipo === tipo);
      var idTipo = Tipo.idTipo;
      partes.push(data.filter(ft=>ft.tipoParte === tipo));
      for (let i in partes[0]){
        var cliente = originalDatas['clientes'].find(fd=>fd.nombreCliente === partes[0][i]['clienteParte']);
        var idCliente = cliente.idCliente;
        var recurso = originalDatas['recursos'].find(fd=>fd.nombreRecurso === partes[0][i]['recursoParte']);
        var idRecurso = recurso.idRecurso;
        partes[0][i]['recursoParte'] = idRecurso;
        partes[0][i]['clienteParte'] = idCliente;
        partes[0][i]['tipoParte'] = idTipo;   
      }
      return partes;
    }

    getFilterPartesCliente(originalDatas:Parte[], data:Parte[],cliente:string){
      var partes = [];

      var Cliente = originalDatas['clientes'].find(fd=>fd.nombreCliente === cliente);
      var idCliente = Cliente.idCliente;
      partes.push(data.filter(ft=>ft.clienteParte === cliente));
      for (let i in partes[0]){
        var descripcionTipo = originalDatas['tipoParte'].find(fd=>fd.nombreTipo === partes[0][i]['tipoParte']);
        var idTipo = descripcionTipo.idTipo;
        var recurso = originalDatas['recursos'].find(fd=>fd.nombreRecurso === partes[0][i]['recursoParte']);
        var idRecurso = recurso.idRecurso;
        partes[0][i]['recursoParte'] = idRecurso;
        partes[0][i]['clienteParte'] = idCliente;
        partes[0][i]['tipoParte'] = idTipo;
      }
      return partes;
    }

  	getPartesPorCliente(datoHeredado:any[], data:Parte[], filtro:string, valor:string){
  		var partes = [];
      var datas = [];
      var datos;
  		partes['partes'] = new Array();
  		partes['labels'] = new Array();
      partes['total'] = new Array();
      switch (filtro) {

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(datoHeredado[0]
              .filter(ft=>ft.clienteParte === datos));
          partes['total'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
          }
        break;

        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(datoHeredado[0]
              .filter(ft=>ft.recursoParte === datos));
          partes['total'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.nombreTipo===valor).idTipo;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.tipoParte === datos));
          partes['total'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.clienteParte === data['clientes'][i].idCliente)).length);
          }
        break;

        case "estado":
          datos= data['estados'].find(ft=>ft.nombreEstado===valor).idEstado;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.estadoParte === datos));
          partes['total'] = datas;
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

  	getPartesPorRecurso(datoHeredado:any[], data:Parte[], filtro:string, valor:string){
      var partes = [];
      var datas = [];
      var datos;
      partes['partes'] = new Array();
      partes['labels'] = new Array();
      partes['total'] = new Array();
     
      switch (filtro) {        
        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(datoHeredado[0]
              .filter(ft=>ft.recursoParte === datos));
          partes['total'] = datas;
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.nombreTipo===valor).idTipo;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.tipoParte === datos));
          partes['total'] = datas;
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.clienteParte === datos));
          partes['total'] = datas;
          for(let i in data['recursos']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;

        case "estado":
          datos= data['estados'].find(ft=>ft.nombreEstado===valor).idEstado;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.estadoParte === datos));
          partes['total'] = datas;
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

  	getPartesPortipo(datoHeredado:any[], data:Parte[], filtro:string, valor:string){
  		var partes = [];
      var datas = [];
      var datos;
      partes['partes'] = new Array();
      partes['labels'] = new Array();
      partes['total'] = new Array();
      partes['descripcion'] = new Array();
      
      switch (filtro) {

        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(datoHeredado[0]
              .filter(ft=>ft.recursoParte === datos));
          partes['total'] = datas;
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.nombreTipo===valor).idTipo;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.tipoParte === datos));
          partes['total'] = datas;
          for(let i in data['tipoParte']){
              partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.clienteParte === datos));
          partes['total'] = datas;
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.tipoParte === data['tipoParte'][i].idTipo)).length);
          }
        break;

        case "estado":
          datos= data['estados'].find(ft=>ft.nombreEstado===valor).idEstado;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.estadoParte === datos));
          partes['total'] = datas;
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
            partes['labels'].push(data['tipoParte'][i].nombreTipo);
            partes['descripcion'].push(data['tipoParte'][i].descripcionTipo);
        }
      return partes;     
  	}

    getPartesPorEstado(datoHeredado:any[], data:Parte[], filtro:string, valor:string){
      var partes = [];
      var datas = [];
      var datos;
      partes['partes'] = new Array();
      partes['labels'] = new Array();
      partes['total'] = new Array();
     
      switch (filtro) {        
        case "recurso":
          datos= data['recursos'].find(ft=>ft.nombreRecurso===valor).idRecurso;
          datas.push(datoHeredado[0]
              .filter(ft=>ft.recursoParte === datos));
          partes['total'] = datas;
          for(let i in data['recursos']){
           partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['recursos'][i].idRecurso)).length);
          }
        break;

        case "tipo":
          datos= data['tipoParte'].find(ft=>ft.nombreTipo===valor).idTipo;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.tipoParte === datos));
          partes['total'] = datas;
          for(let i in data['tipoParte']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['tipoParte'][i].idTipo)).length);
          } 
        break;

        case "cliente":
          datos= data['clientes'].find(ft=>ft.nombreCliente===valor).idCliente;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.clienteParte === datos));
          partes['total'] = datas;
          for(let i in data['clientes']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.recursoParte === data['clientes'][i].idCliente)).length);
          }
        break;

        case "estado":
          datos= data['estados'].find(ft=>ft.nombreEstado===valor).idEstado;
          datas.push(datoHeredado[0]
            .filter(ft=>ft.estadoParte === datos));
          partes['total'] = datas;
          for(let i in data['estados']){
            partes['partes'].push(Object.keys(datas[0]
              .filter(ft=>ft.estadoParte === data['estados'][i].idEstado)).length);
          }
        break;

        default:
          for(let i in data['estados']){
            partes['partes'].push(Object.keys(data['partes']
            .filter(ft=>ft.estadoParte === data['estados'][i].idEstado)).length); 
          }
        break;
        }
        for(let i in data['estados']){
            partes['labels'].push(data['estados'][i].nombreEstado);
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

      datos = datas['tipoParte'].find(ft=>ft.idTipo===tipo).nombreTipo;
      return datos;
    }

    getConversDescripcionTipos(datas:Parte[], tipo:string){
      var datos;

      datos = datas['tipoParte'].find(ft=>ft.idTipo===tipo).descripcionTipo;
      return datos;
    }

    
}
  		