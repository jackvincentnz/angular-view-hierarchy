import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Injector,
} from "@angular/core";
import { Provided, ViewProvided } from "../injection-tokens";
import { InspectorComponent } from "../inspector/inspector.component";

interface Context {
  $implicit: { value: string };
}

class ChildProvided implements Provided {
  providedBy = "ChildComponent";
  emoji = "🌻";
}

class ChildViewProvided extends ChildProvided {
  emoji = "🐶";
}

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
  providers: [{ provide: Provided, useClass: ChildProvided }],
  viewProviders: [{ provide: ViewProvided, useClass: ChildViewProvided }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements AfterViewInit {
  @Input()
  templates: TemplateRef<Context>[];

  context = { $implicit: { value: "context-value" } };

  @ViewChild("viewContainer", { read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  constructor(
    private provided: Provided,
    private viewProvided: ViewProvided,
    private cdr: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
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

    const inspectorComponentFactory = this.resolver.resolveComponentFactory(
      InspectorComponent
    );
    const inspectorComponent = inspectorComponentFactory.create(this.injector);
    const context = inspectorComponent.instance;
    context.declared = "Created And Inserted By ChildComponent";
    context.value = `
      This inspector was created in the child component
      so sees everything it provides!
    `;
    this.viewContainer.insert(inspectorComponent.hostView);

    // Have to force change detection since we manipulated the structure of the view
    // and made it dirty after the check had already completed.
    this.cdr.detectChanges();
  }
}
