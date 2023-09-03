import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css'],
})
export class MultiStepFormComponent {
  multiStepForm = new FormGroup({
    isAnnual: new FormControl(false),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    // plans
    plans: new FormGroup({
      arcade: new FormControl(false),
      advanced: new FormControl(false),
      pro: new FormControl(false),
    }),
    // add-ons
    onlineService: new FormControl(false),
    largerStorage: new FormControl(false),
    customizableProfile: new FormControl(false),
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

  plan = '';

  plans = [false, false, false];

  addOns = [false, false, false];

  setPlan(plan: number) {
    this.plans = [false, false, false];
    this.plans[plan] = true;
    console.log(this.plans);
  }

  changePlan(plan: string) {
    this.plan = plan;
  }

  setIsAnnual() {
    this.isAnnual = !this.isAnnual;
    console.log(this.isAnnual);
  }

  setAddon(index: number) {
    this.addOns[index] = !this.addOns[index];
    console.log(this.addOns);
  }

  setRadioPlan(controlName: string) {
    const planForm = this.multiStepForm.get('plans') as FormGroup;
    const control = planForm.get(controlName);
    planForm.reset();
    control?.setValue(true);
    this.test();
  }

  test() {
    console.log(this.multiStepForm.value.plans);
  }
}
