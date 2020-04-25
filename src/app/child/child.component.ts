import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { FlowerService } from "../flower.service";
import { AnimalService } from "../animal.service";
import { Parent } from "../parent";

interface Context {
  $implicit: { value: string };
}

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
  providers: [
    { provide: FlowerService, useValue: { emoji: "🌻" } },
    { provide: Parent, useValue: { name: "ChildComponent" } },
  ],
  viewProviders: [{ provide: AnimalService, useValue: { emoji: "🐶" } }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements AfterViewInit {
  @Input()
  templates: TemplateRef<Context>[];

  context = { $implicit: { value: "context-value" } };

  @ViewChild("viewContainer", { read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  constructor(
    public flower: FlowerService,
    public animal: AnimalService,
    private cdr: ChangeDetectorRef
  ) {
    console.log("ChildComponent Initialized.");
  }

  ngAfterViewInit(): void {
    this.templates.forEach((template) => {
      // create new view from template and context
      const view = template.createEmbeddedView(this.context);
      // add view to container
      this.viewContainer.insert(view);

      // can also do:
      // this.viewContainer.createEmbeddedView(template, this.context);
    });

    // Have to force change detection since we manipulated the structure of the view
    // and made it dirty after the check had already completed.
    this.cdr.detectChanges();
  }
}
