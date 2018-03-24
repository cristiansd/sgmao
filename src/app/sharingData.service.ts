/*import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharingDataService {
data = [];

public _dataSource = new BehaviorSubject('f');
		dataSource$ = this._dataSource.asObservable();

sendMessage(message: string) {
        this._dataSource.next(message);
        console.log('sendMessage activado');
        console.log(message);
    }

   

/*public _dataSource = new BehaviorSubject<any[]>([]);
//public _dataSource = new BehaviorSubject('f');
dataSource$ = this._dataSource.asObservable();

setPrueba(data:any[]){
	 this.data = data;
	 this._dataSource.next(this.data);
	 console.log('metodo setPrueba');
	 console.log(data);
}
/*setPrueba(data:string){
	 this.data = data;
	 this._dataSource.next(this.data);
	 console.log('metodo setPrueba');
	 console.log(this.data);


}*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class SharingDataService {

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string):Observable<string> {
    this.messageSource.next(message);
    console.log('metodo changeMessage');
    console.log(message);
    return this.messageSource.asObservable();

  }

}
    
