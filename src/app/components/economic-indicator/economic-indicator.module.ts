import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicIndicatorRoutingModule } from './economic-indicator-routing.module';
import { EconomicIndicatorComponent } from './economic-indicator.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EconomicIndicatorService } from 'src/app/services/economic-indicator.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [EconomicIndicatorComponent, CurrencyConverterComponent],
  imports: [
    CommonModule,
    EconomicIndicatorRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [EconomicIndicatorService],
})
export class EconomicIndicatorModule {}
