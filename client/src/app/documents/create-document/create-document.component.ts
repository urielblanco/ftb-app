import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { DocumentsService } from '../documents.service';

import { allergensList } from '../../utils/allergens';

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

  allergensList = allergensList;

  constructor(
    private navbarService: NavbarService,
    private fb: FormBuilder,
    private documentService: DocumentsService
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

  addAllergen(index: number) {
    const allergen = this.fb.control(index);

    this.allergens.push(allergen);
    console.log(this.allergens);
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

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  deleteAllergen(index: number) {
    this.ingredients.removeAt(index);
  }

  deleteRawMaterial(index: number) {
    this.rawMaterials.removeAt(index);
  }

  saveForm() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.fourthFormGroup.value);

    this.documentService
      .createDocument({
        technicalSheet: this.firstFormGroup.value,
        backwardTraceability: this.secondFormGroup.value,
        internalTraceability: this.thirdFormGroup.value,
        forwardTraceability: this.fourthFormGroup.value,
      })
      .subscribe((data) => console.log(data));
  }
}
