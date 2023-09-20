import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: [
    './multi-step-form.component.css',
    './multi-step-form-steps.component.css',
  ],
})
export class MultiStepFormComponent {
  multiStepForm = new FormGroup({
    isAnnual: new FormControl(false),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    // plans
    arcade: new FormControl(false),
    advanced: new FormControl(false),
    pro: new FormControl(false),
    // add-ons
    onlineService: new FormControl(false),
    largerStorage: new FormControl(false),
    customizableProfile: new FormControl(false),
  });

  prices = {
    arcade: { monthly: 9, annually: 90 },
    advanced: { monthly: 12, annually: 120 },
    pro: { monthly: 15, annually: 150 },
    onlineService: { monthly: 1, annually: 10 },
    largerStorage: { monthly: 2, annually: 20 },
    customizableProfile: { monthly: 2, annually: 20 },
  };

  setIsAnnual() {
    this.multiStepForm.patchValue({ isAnnual: true });
  }

  setRadioPlan(controlName: string) {
    this.multiStepForm.patchValue({
      arcade: false,
      advanced: false,
      pro: false,
    });
    const patchObject: { [key: string]: boolean } = {};
    patchObject[controlName] = true;
    this.multiStepForm.patchValue(patchObject);
  }

  setRadioAddon(controlName: string) {
    const currentValue = this.multiStepForm.get(controlName)?.value;
    this.multiStepForm.get(controlName)?.setValue(!currentValue);
  }

  totalMonthly() {
    let nums = [];

    let total = 0;

    if (this.multiStepForm.value.arcade) {
      nums.push(this.prices.arcade.monthly);
    }

    if (this.multiStepForm.value.advanced) {
      nums.push(this.prices.advanced.monthly);
    }

    if (this.multiStepForm.value.pro) {
      nums.push(this.prices.pro.monthly);
    }

    if (this.multiStepForm.value.onlineService) {
      nums.push(this.prices.onlineService.monthly);
    }

    if (this.multiStepForm.value.largerStorage) {
      nums.push(this.prices.largerStorage.monthly);
    }

    if (this.multiStepForm.value.customizableProfile) {
      nums.push(this.prices.customizableProfile.monthly);
    }

    for (let i = 0; i < nums.length; i++) {
      total += nums[i];
    }

    return total;
  }

  totalAnnually() {
    let nums = [];

    let total = 0;

    if (this.multiStepForm.value.arcade) {
      nums.push(this.prices.arcade.annually);
    }

    if (this.multiStepForm.value.advanced) {
      nums.push(this.prices.advanced.annually);
    }

    if (this.multiStepForm.value.pro) {
      nums.push(this.prices.pro.annually);
    }

    if (this.multiStepForm.value.onlineService) {
      nums.push(this.prices.onlineService.annually);
    }

    if (this.multiStepForm.value.largerStorage) {
      nums.push(this.prices.largerStorage.annually);
    }

    if (this.multiStepForm.value.customizableProfile) {
      nums.push(this.prices.customizableProfile.annually);
    }

    for (let i = 0; i < nums.length; i++) {
      total += nums[i];
    }

    return total;
  }

  stepCounter = 0;

  incrementStep() {
    if (
      this.stepCounter === 0 &&
      this.isName() &&
      this.isEmail() &&
      this.isUSPhone()
    ) {
      this.stepCounter += 1;
    } else if (
      this.stepCounter === 1 &&
      (this.multiStepForm.value.arcade ||
        this.multiStepForm.value.advanced ||
        this.multiStepForm.value.pro)
    ) {
      this.stepCounter += 1;
    } else if (this.stepCounter === 2) {
      this.stepCounter += 1;
    }
  }

  decrementStep() {
    if (this.stepCounter > 0) {
      this.stepCounter -= 1;
    }
  }

  isName() {
    const name: any = this.multiStepForm.value.name;
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
    if (namePattern.test(name)) {
      return true;
    } else {
      return false;
    }
  }

  isNameEmpty() {
    const name: any = this.multiStepForm.value.name;
    if (!name) {
      return true;
    } else {
      return false;
    }
  }

  isEmail() {
    const email: any = this.multiStepForm.value.email;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  isEmailEmpty() {
    const email: any = this.multiStepForm.value.email;
    if (!email) {
      return true;
    } else {
      return false;
    }
  }

  isUSPhone() {
    const phone: any = this.multiStepForm.value.phone;
    const phonePattern = /^\d{10}$/;
    if (phonePattern.test(phone)) {
      return true;
    } else {
      return false;
    }
  }

  isPhoneEmpty() {
    const phone: any = this.multiStepForm.value.phone;
    if (!phone) {
      return true;
    } else {
      return false;
    }
  }

  changePlan() {
    this.stepCounter = 1;
  }

  submitForm() {
    console.log(this.multiStepForm.value);
    this.stepCounter += 1;
  }
}
