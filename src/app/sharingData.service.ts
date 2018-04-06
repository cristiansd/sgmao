import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharingDataService {
data = [];

public _dataSource = new BehaviorSubject<any[]>([]);
dataSource$ = this._dataSource.asObservable();

setDatas(data:any[]){
	 this.data = data;
	 this._dataSource.next(this.data);
	 console.log('metodo setDatas');  
  }
}
    
