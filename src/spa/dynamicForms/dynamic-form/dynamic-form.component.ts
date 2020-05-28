import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output
} from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FieldInput } from "../field-interface";
import { SpaConfigService } from 'src/spa/services/spa-config.service';

@Component({
  selector: "spa-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"]
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() vm: any;
  @Input() vmDefinition: Array<FieldInput>;
  @Input() operation: string;
  @Input() errorMessage: string;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  status: string;
  submitted = false;
  vmCopy: any;

  icons: string[] = [
    "battery",
    "car",
    "car-oil",
    "car-engine",
    "sports-car",
    "shifter",
    "calendar",
    "car-seat",
    "jeep",
    "painted-car",
    "price",
    "location",
    "van"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private spaConfigService: SpaConfigService,
  ) {
    this.icons.forEach(icon => this.spaConfigService.addSvgIcon(icon));
    
  }

  clearForm() {
    const group = {};
    this.vmCopy = Object.assign({}, this.vm);
    this.vmDefinition.forEach(field => {
      if (field.child) {
        field.child.forEach(fieldChild => {
          group[fieldChild.key] = fieldChild.required
            ? new FormControl(
                this.vmCopy[field.key][fieldChild.key],
                Validators.required
              )
            : new FormControl(this.vmCopy[field.key][fieldChild.key]);
        });
      }
      group[field.key] = field.required
        ? new FormControl(this.vmCopy[field.key], Validators.required)
        : new FormControl(this.vmCopy[field.key]);
    });
    this.form = new FormGroup(group);
    // console.log(this.form);
  }

  ngOnInit() {
    this.clearForm();
    this.route.params.subscribe(params => {
      this.operation = params["operation"];
      this.clearForm();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["errorMessage"].currentValue && this.status === "waiting") {
      this.status = "";
    }
  }

  onBack() {
    this.errorMessage = null;
    this.location.back();
  }
  onEdit() {
    this.router.navigate(["../", "edit"], { relativeTo: this.route });
  }
  onCancel() {
    this.onBack();
  }
  onSave() {
    this.submitted = true;
    if (this.form.valid) {
      this.form.controls["engine"].patchValue({
        fuel_type: this.form.controls["fuel_type"].value,
        transmission: this.form.controls["transmission"].value,
        cubic_capacity: this.form.controls["cubic_capacity"].value
      });
      this.status = "waiting";
      this.update.emit(this.form.value);
      // debugger;
    }
  }
  onCreate() {
    this.submitted = true;
    if (this.form.valid) {
      this.form.controls["engine"].patchValue({
        fuel_type: this.form.controls["fuel_type"].value,
        transmission: this.form.controls["transmission"].value,
        cubic_capacity: this.form.controls["cubic_capacity"].value
      });
      this.status = "waiting";
      this.create.emit(this.form.value);
    }
  }
  onSubmit() {}
}
