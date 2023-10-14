import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EconomicIndicatorService } from '../../services/economic-indicator.service';

@Component({
  selector: 'app-economic-indicator',
  templateUrl: './economic-indicator.component.html',
  styleUrls: ['./economic-indicator.component.scss'],
})
export class EconomicIndicatorComponent implements OnInit {
  amount: number = 0; // Initialize amount to 0
  selectedCurrency: string = 'USD'; // Initialize selectedCurrency to 'USD'
  convertedAmount: number = 0; // Initialize convertedAmount to 0
  converterForm: FormGroup; // Initialize the form group
  amountInputPlaceholder: string = 'Amount to convert from CRC to USD'; // Initialize with a default value
  exchangeRates: { usdToColones: number } = { usdToColones: 0 }; // Initialize exchangeRates with usdToColones as 0
  loading: boolean = true; // Initialize loading as true

  constructor(
    private economicIndicatorService: EconomicIndicatorService,
    private formBuilder: FormBuilder
  ) {
    // Create the form group with initial values and validation
    this.converterForm = this.formBuilder.group({
      amount: [0, [Validators.required, this.minValueValidator(0.01)]],
      currency: 'USD',
    });
  }

  ngOnInit() {
    this.getIndicator(); // Fetch economic indicator data when the component initializes
  }

  // Method to handle currency conversion
  convertCurrency() {
    const amountControl = this.converterForm.get('amount');

    if (amountControl) {
      // Reapply validation for the amount field
      amountControl.setValidators([
        Validators.required,
        this.minValueValidator(0.01),
      ]);
      amountControl.updateValueAndValidity();
    }

    const currencyControl = this.converterForm.get('currency');

    if (currencyControl?.value === 'USD') {
      this.convertedAmount = this.amount / this.exchangeRates.usdToColones;
    } else {
      this.convertedAmount = this.amount * this.exchangeRates.usdToColones;
    }
  }

  // Fetch the economic indicator data
  getIndicator() {
    this.economicIndicatorService.GetIndicator().subscribe({
      next: (result) => {
        if (
          result &&
          result.data &&
          result.data.amount &&
          result.data.amount > 0
        ) {
          // Update exchangeRates with the fetched data
          this.exchangeRates = { usdToColones: result.data.amount };
          this.loading = false;
        }
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  // Format the converted amount with currency symbol
  getFormattedAmount(amount: number, currency: string | null) {
    if (!currency) {
      const currencyControl = this.converterForm.get('currency');
      if (currencyControl?.value) currency = currencyControl?.value;
    }

    const formattedAmount = amount.toFixed(4);
    const parts = formattedAmount.split('.');
    if (parts.length === 2) {
      const integerPart = parts[0];
      let decimalPart = parts[1];

      // Remove trailing zeros from the decimal part
      decimalPart = decimalPart.replace(/0+$/, '');

      // If the decimal part is now empty, don't display a decimal point
      if (decimalPart === '') {
        return `${currency === 'USD' ? '$' : '₡'} ${integerPart}`;
      } else {
        return `${
          currency === 'USD' ? '$' : '₡'
        } ${integerPart}.${decimalPart}`;
      }
    }

    return `${currency === 'USD' ? '$' : '₡'} ${formattedAmount}`;
  }

  // Check if the form should be disabled
  disableForm() {
    return (
      (!this.exchangeRates ||
        this.exchangeRates.usdToColones === 0 ||
        this.exchangeRates.usdToColones === null) &&
      !this.loading
    );
  }

  // Custom validator function to check for a minimum value
  minValueValidator(minValue: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value <= minValue) {
        return { min: true };
      }
      return null;
    };
  }

  // Handle key events to prevent non-numeric input
  onAmountKeyDown(event: KeyboardEvent): void {
    if (
      !/^[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight|Home|End$/i.test(
        event.key
      )
    ) {
      event.preventDefault();
    }
  }

  // Validate the exchange rate and set errors if invalid
  validateExchangeRate() {
    const exchangeRate = this.exchangeRates.usdToColones;
    if (exchangeRate <= 0) {
      this.converterForm
        .get('currency')
        ?.setErrors({ invalidExchangeRate: true });
    }
  }

  // Reset the calculator to its initial state
  resetCalculator() {
    this.converterForm.reset({
      amount: 0, // Set initial amount
      currency: 'USD', // Set initial currency
    });

    // Clear the 'amountIsZero' error
    this.converterForm.get('amount')?.setErrors(null);

    this.amount = 0;
    this.selectedCurrency = 'USD';
    this.convertedAmount = 0;
  }

  // Handle currency change
  onCurrencyChange() {
    this.amountInputPlaceholder = `Amount to convert from ${
      this.selectedCurrency === 'USD' ? 'CRC' : 'USD'
    } to ${this.selectedCurrency === 'USD' ? 'USD' : 'CRC'}`;

    if (this.amount > 0) {
      this.convertCurrency();
    } else if (this.convertedAmount > 0) {
      this.convertedAmount = 0;
    }
  }
}
