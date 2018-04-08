import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';




import { AppComponent } from './app.component';
import { NavPanelComponent } from './navPanel/navPanel.component';
import { BotonPanelComponent } from './botonPanel/botonPanel.component';
import { MyChartComponent } from './chartPie/chartPie.component';
import { TimeSelectorComponent } from './time-selector/timeSelector.component';
import { navBarComponent } from './navBar/navBar.component';
import { listComponent } from './list/list.component';

import {DataService } from './data.service';

import {MyFilterPipe } from './MyFilterPiple';

import {HttpClientModule} from '@angular/common/http';

import {HttpClientJsonpModule} from '@angular/common/http';

import { JsonpModule } from '@angular/http';

import { OrderModule } from 'ngx-order-pipe';

import {SharingDataService } from './sharingData.service';

import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    NavPanelComponent,
    BotonPanelComponent,
    MyChartComponent,
    TimeSelectorComponent,
    navBarComponent,
    listComponent,    
    MyFilterPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HttpModule,
    JsonpModule,
    CommonModule,
    FormsModule,
    NgbModule.forRoot(), 
    OrderModule
    
    
  ],
  providers:[DataService, SharingDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
