import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { DocumentsService } from '../documents.service';
import { ToastrService } from 'ngx-toastr';

import { allergensList } from '../../utils/allergens';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

import { zip } from 'rxjs';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss'],
})
export class CreateDocumentComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  allergensList = allergensList.slice();

  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private fb: FormBuilder,
    private documentsService: DocumentsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.navbarService.setModeEditor('Cargar Trazabilidad');
  }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      descriptionInput: ['', Validators.required],
      ingredientInput: [''],
      ingredients: this.fb.array([]),
      allergens: this.fb.array([]),
      conditionsInput: [''],
      usefulLifeInput: [''],
    });

    this.secondFormGroup = this.fb.group({
      materialNameInput: [''],
      materialLocationInput: [''],
      materialProviderInput: [''],
      materialContactInput: [''],
      materialLotInput: [''],
      materialDateReceptionInput: [''],
      materialDateExpirationInput: [''],
      materialQuantityReceivedInput: [''],
      materialUnitMeasurementInput: [''],
      rawMaterials: this.fb.array([]),
    });

    this.thirdFormGroup = this.fb.group({
      productNameInput: [''],
      dateLotInput: [''],
      dateExpirationInput: [''],
      productUsefulLifeInput: [''],
      dateManufacturingInput: [''],
      quantityManufacturingInput: [''],
    });

    this.fourthFormGroup = this.fb.group({
      boxInput: [''],
      clientDescriptionInput: [''],
      clientCodeInput: [''],
      dateInput: [''],
      carRegistrationInput: [''],
      deliveryNoteInput: [''],
      differenceInput: [''],
    });

    const material = this.fb.control({
      nameInput: 'Harina Silo 8',
      locationInput: 'Silo 8',
      providerInput: 'Harinera Vilafranquina',
      contactInput: '920301030',
      lotInput: '1314337983',
      dateReceptionInput: '2022-05-02T22:00:00.000Z',
      dateExpirationInput: '2022-01-08T23:00:00.000Z',
      quantityReceivedInput: 26.5,
      unitMeasurementInput: 'Kg',
    });

    this.rawMaterials.push(material);
  }

  get ingredients() {
    return this.firstFormGroup.controls['ingredients'] as FormArray;
  }

  get allergens() {
    return this.firstFormGroup.controls['allergens'] as FormArray;
  }

  get rawMaterials() {
    return this.secondFormGroup.controls['rawMaterials'] as FormArray;
  }

  addIngredient(name: string) {
    const ingredient = this.fb.control(name);

    this.ingredients.push(ingredient);
    this.firstFormGroup.get('ingredientInput')?.setValue('');
    console.log(this.ingredients);
  }

  addAllergen(allergenObj: any) {
    const allergen = this.fb.control(allergenObj);

    this.allergens.push(allergen);
    console.log(allergen);
  }

  addRawMaterial() {
    const material = this.fb.control({
      nameInput: this.secondFormGroup.get('materialNameInput')?.value,
      locationInput: this.secondFormGroup.get('materialLocationInput')?.value,
      providerInput: this.secondFormGroup.get('materialProviderInput')?.value,
      contactInput: this.secondFormGroup.get('materialContactInput')?.value,
      lotInput: this.secondFormGroup.get('materialLotInput')?.value,
      dateReceptionInput: this.secondFormGroup.get('materialDateReceptionInput')
        ?.value,
      dateExpirationInput: this.secondFormGroup.get(
        'materialDateExpirationInput'
      )?.value,
      quantityReceivedInput: this.secondFormGroup.get(
        'materialQuantityReceivedInput'
      )?.value,
      unitMeasurementInput: this.secondFormGroup.get(
        'materialUnitMeasurementInput'
      )?.value,
    });

    this.rawMaterials.push(material);
    this.secondFormGroup.get('materialNameInput')?.reset();
    this.secondFormGroup.get('materialLocationInput')?.reset();
    this.secondFormGroup.get('materialProviderInput')?.reset();
    this.secondFormGroup.get('materialContactInput')?.reset();
    this.secondFormGroup.get('materialLotInput')?.reset();
    this.secondFormGroup.get('materialDateReceptionInput')?.reset();
    this.secondFormGroup.get('materialDateExpirationInput')?.reset();
    this.secondFormGroup.get('materialQuantityReceivedInput')?.reset();
    this.secondFormGroup.get('materialUnitMeasurementInput')?.reset();
    console.log(this.rawMaterials);
  }

  toggleAllergen(index: number) {
    this.allergensList[index].value = !this.allergensList[index].value;
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  deleteRawMaterial(index: number) {
    this.rawMaterials.removeAt(index);
  }

  saveForm() {
    if (this.firstFormGroup.invalid) return;
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.fourthFormGroup.value);

    this.allergensList.forEach((allergen: any, index) => {
      if (allergen.value) this.addAllergen({ index, value: allergen.value });
    });

    this.documentsService
      .createDocument({
        technicalSheet: this.firstFormGroup.value,
        backwardTraceability: this.secondFormGroup.value,
        internalTraceability: this.thirdFormGroup.value,
        forwardTraceability: this.fourthFormGroup.value,
        user: this.authService.user?._id,
      })
      .subscribe((data) => {
        this.toastr.success('Producto guardado!');
        this.router.navigate(['/documents']);
      });
  }

  signBlockchain() {
    if (this.firstFormGroup.invalid) return;

    const result$ = zip(
      this.documentsService.createDocument({
        technicalSheet: this.firstFormGroup.value,
        backwardTraceability: this.secondFormGroup.value,
        internalTraceability: this.thirdFormGroup.value,
        forwardTraceability: this.fourthFormGroup.value,
        user: this.authService.user?._id,
        state: 'blockchain',
      }),
      this.documentsService.signInBlockchain()
    );

    result$.subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success('Producto registrado!');
        this.router.navigate(['/documents']);
      },
      error: () => this.toastr.error('No se pudo registrar el producto!'),
    });
  }
}
