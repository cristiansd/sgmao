import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharingDataService {
data = [];

public _dataSource = new BehaviorSubject<any[]>([]);
dataSource$ = this._dataSource.asObservable();

setPrueba(data:any[]){
     this.data = data;
     this._dataSource.next(this.data);
    }
    
}