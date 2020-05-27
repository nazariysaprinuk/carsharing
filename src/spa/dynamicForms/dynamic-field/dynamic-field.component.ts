import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FieldInput } from "../field-interface";
import { Lightbox } from "ngx-lightbox";
import { LightboxService } from 'src/spa/services/lightbox.service';

@Component({
  selector: "spa-dynamic-field",
  templateUrl: "./dynamic-field.component.html",
  styleUrls: ["./dynamic-field.component.css"],
  providers: [LightboxService]
})
export class DynamicFieldComponent implements OnInit, OnChanges {
  @Input() field: FieldInput;
  @Input() form: FormGroup;

  @Input() operation: string;
  @Input() submitted: boolean;

  imageURL: string;
  __pathtocars = "assets/cars/";
  public _album: Array<any> = [];
  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  constructor(public lightboxService: LightboxService, public fb: FormBuilder) {}

  ngOnInit() {
    if (!this.form.value.image) {
      this.form.patchValue({
        image: this.__pathtocars + "notfound.png"
      });
    }
    this.lightboxService.album.push({
      src: this.form.value["image"],
      caption: this.form.value["name"] + ' ' + this.form.value["model"],
      thumb: this.form.value["image"]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: this.__pathtocars + file.name
    });
    // console.log(this.form);
    this.form.get("image").updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
