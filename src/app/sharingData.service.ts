import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharingDataService {
data = [];

public _dataSource = new BehaviorSubject<any[]>([]);
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
	 console.log(this.data);*/
}
    
}