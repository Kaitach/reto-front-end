import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './presentation/shared/material';
import { ToolbarrComponent } from './presentation/shared/toolbarr/toolbarr.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDataComponent } from './presentation/components/account-data/account-data.component';
import { DepositComponent } from './presentation/components/deposit/deposit.component';
import { TransferComponent } from './presentation/components/transfer/transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarrComponent,
    
    
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
