import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../_services/product.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.id = this.route.snapshot.params['id']
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    })

    if (!this.isAddMode) {
      this.productService.getById(parseInt(this.id))
        .pipe(first())
        .subscribe(product => this.form.patchValue(product))
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.loading = true;

    if (this.form.invalid){
      return;
    }

    if (this.isAddMode) {
      this.createProduct()
    } else {
      this.updateProduct()
    }
  }

  private createProduct() {
    this.productService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
        }
      });
  }

  private updateProduct() {
    console.log("update")
    console.log(this.form.value)
    this.productService.update(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
        }
      });
  }
}
