import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { DocumentsService } from '../documents.service';

import { allergensList } from '../../utils/allergens';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, zip } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss'],
})
export class EditDocumentComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  allergensList = allergensList.slice();

  subscription: Subscription;

  document: any;

  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private fb: FormBuilder,
    private documentsService: DocumentsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.navbarService.setModeEditor('Editar Trazabilidad');
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

    /*     const material = this.fb.control({
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

    this.rawMaterials.push(material); */

    this.subscription = this.subscription = this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.documentsService.getDocument(params.get('id')!)
        )
      )
      .subscribe((response: any) => {
        this.document = response.data.document;
        console.log(this.document);
        this.setDocumentForms();
      });
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
  }

  addAllergen(allergenObj: any) {
    const allergen = this.fb.control(allergenObj);

    this.allergens.push(allergen);
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

  deleteRawMaterial(index: number) {
    this.rawMaterials.removeAt(index);
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  saveForm() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.fourthFormGroup.value);

    this.allergensList.forEach((allergen: any, index) => {
      if (allergen.value) this.addAllergen({ index, value: allergen.value });
    });

    this.documentsService
      .updateDocument(
        {
          technicalSheet: this.firstFormGroup.value,
          backwardTraceability: this.secondFormGroup.value,
          internalTraceability: this.thirdFormGroup.value,
          forwardTraceability: this.fourthFormGroup.value,
          user: this.authService.user?._id,
        },
        this.document._id
      )
      .subscribe((data) => {
        this.toastr.success('Producto actualizado!');
        this.router.navigate(['/documents']);
      });
  }

  private setDocumentForms() {
    this.setFirstForm();
    this.setSecondForm();
    this.setThirdForm();

    this.setFouthForm();
  }

  private setFouthForm() {
    this.fourthFormGroup
      .get('boxInput')
      ?.setValue(this.document.forwardTraceability?.boxInput);

    this.fourthFormGroup
      .get('clientDescriptionInput')
      ?.setValue(this.document.forwardTraceability?.clientDescriptionInput);

    this.fourthFormGroup
      .get('clientCodeInput')
      ?.setValue(this.document.forwardTraceability?.clientCodeInput);

    this.fourthFormGroup
      .get('dateInput')
      ?.setValue(this.document.forwardTraceability?.dateInput);

    this.fourthFormGroup
      .get('carRegistrationInput')
      ?.setValue(this.document.forwardTraceability?.carRegistrationInput);

    this.fourthFormGroup
      .get('deliveryNoteInput')
      ?.setValue(this.document.forwardTraceability?.deliveryNoteInput);

    this.fourthFormGroup
      .get('differenceInput')
      ?.setValue(this.document.forwardTraceability?.differenceInput);
  }

  private setThirdForm() {
    this.thirdFormGroup
      .get('productNameInput')
      ?.setValue(this.document.internalTraceability?.productNameInput);

    this.thirdFormGroup
      .get('dateLotInput')
      ?.setValue(this.document.internalTraceability?.dateLotInput);

    this.thirdFormGroup
      .get('dateExpirationInput')
      ?.setValue(this.document.internalTraceability?.dateExpirationInput);

    this.thirdFormGroup
      .get('productUsefulLifeInput')
      ?.setValue(this.document.internalTraceability?.productUsefulLifeInput);

    this.thirdFormGroup
      .get('dateManufacturingInput')
      ?.setValue(this.document.internalTraceability?.dateManufacturingInput);

    this.thirdFormGroup
      .get('quantityManufacturingInput')
      ?.setValue(
        this.document.internalTraceability?.quantityManufacturingInput
      );
  }

  private setSecondForm() {
    for (const rawMat of this.document.backwardTraceability?.rawMaterials) {
      const material = this.fb.control({
        nameInput: rawMat.nameInput,
        locationInput: rawMat.locationInput,
        providerInput: rawMat.providerInput,
        contactInput: rawMat.contactInput,
        lotInput: rawMat.lotInput,
        dateReceptionInput: rawMat.dateReceptionInput,
        dateExpirationInput: rawMat.dateExpirationInput,
        quantityReceivedInput: rawMat.quantityReceivedInput,
        unitMeasurementInput: rawMat.unitMeasurementInput,
      });

      this.rawMaterials.push(material);
    }
  }

  private setFirstForm() {
    this.firstFormGroup
      .get('descriptionInput')
      ?.setValue(this.document.technicalSheet?.descriptionInput);

    for (const ingredient of this.document.technicalSheet?.ingredients) {
      this.addIngredient(ingredient);
    }

    for (const allergen of this.document.technicalSheet?.allergens) {
      this.allergensList[allergen.index].value = allergen.value;
    }

    this.firstFormGroup
      .get('conditionsInput')
      ?.setValue(this.document.technicalSheet?.conditionsInput);

    this.firstFormGroup
      .get('usefulLifeInput')
      ?.setValue(this.document.technicalSheet?.usefulLifeInput);
  }

  signBlockchain() {
    if (this.firstFormGroup.invalid) return;

    const result$ = zip(
      this.documentsService.updateDocument(
        {
          technicalSheet: this.firstFormGroup.value,
          backwardTraceability: this.secondFormGroup.value,
          internalTraceability: this.thirdFormGroup.value,
          forwardTraceability: this.fourthFormGroup.value,
          user: this.authService.user?._id,
          state: 'blockchain',
        },
        this.document._id
      ),
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
