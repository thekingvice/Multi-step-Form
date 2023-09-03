import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css'],
})
export class MultiStepFormComponent {
  multiStepForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    plans: new FormGroup({
      arcade: new FormControl(false),
      advanced: new FormControl(false),
      pro: new FormControl(false),
    }),
    addOns: new FormGroup({
      onlineService: new FormControl(false),
      largerStorage: new FormControl(false),
      customizableProfile: new FormControl(false),
    }),
  });

  isAnnual = false;

  prices = {
    arcade: { monthly: 9, annually: 90 },
    advanced: { monthly: 12, annually: 120 },
    pro: { monthly: 15, annually: 150 },
    onlineService: { monthly: 1, annually: 10 },
    largerStorage: { monthly: 2, annually: 20 },
    customizableProfile: { monthly: 2, annually: 20 },
  };

  plans = [false, false, false];

  addOns = [false, false, false];

  setPlan(event: Event, plan: number) {
    event.preventDefault();
    for (let i = 0; i < this.plans.length; i++) {
      this.plans[i] = false;
    }
    this.plans[plan] = true;
    console.log(this.plans[plan]);
  }

  setIsAnnual(event: Event) {
    event.preventDefault();
    this.isAnnual = !this.isAnnual;
  }

  setAddon(event: Event, index: number) {
    event.preventDefault();
    this.addOns[index] = !this.addOns[index];
    console.log(this.addOns);
  }

  test() {
    console.log(this.multiStepForm);
  }
}
