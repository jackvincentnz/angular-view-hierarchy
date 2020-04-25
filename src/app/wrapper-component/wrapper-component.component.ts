import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "app-wrapper-component",
  templateUrl: "./wrapper-component.component.html",
  styleUrls: ["./wrapper-component.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperComponentComponent<T> implements OnInit {
  @Input()
  parentTemplate: TemplateRef<T>;

  constructor() {}

  ngOnInit(): void {}
}
