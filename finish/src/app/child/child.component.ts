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
  ComponentFactory,
  Optional,
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
  providers: [{ provide: Provided, useClass: ChildProvided }],
  viewProviders: [{ provide: ViewProvided, useClass: ChildViewProvided }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements AfterViewInit {
  @Input()
  templates: TemplateRef<Context>[];

  @Input()
  embeddedTemplate: TemplateRef<Context>;

  @Input()
  factory: ComponentFactory<InspectorComponent>;

  context = { $implicit: { value: "context-value" } };

  @ViewChild("viewContainer", { read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Optional()
    private provided?: Provided,
    @Optional()
    private viewProvided?: ViewProvided
  ) { }

  ngAfterViewInit(): void {
    // Converting TemplateRefs to ViewRefs and embedding using a ViewContainerRef
    this.templates.forEach((template) => {
      // Create new view instance for template and context
      const view = template.createEmbeddedView(this.context);
      // Add view to end of container
      this.viewContainer.insert(view);

      // Can also use shorthand from `ViewContainerRef`
      // this.viewContainer.createEmbeddedView(template, this.context);
    });

    // Instantiate ComponentRef and insert view using ViewContainerRef
    const factory = this.resolver.resolveComponentFactory(InspectorComponent);
    const component = factory.create(this.injector);
    component.instance.declared = "Created And Inserted By ChildComponent";
    component.instance.value = `
      This inspector was created in the child component
      so sees everything it provides!
    `;
    this.viewContainer.insert(component.hostView);

    // Can also use shorthand from `ViewContainerRef`
    // this.viewContainer.createComponent(factory, undefined, this.injector);

    // Instantiate ComponentRef from @Input() factory and insert view using ViewContainerRef
    const inputComponent = this.factory.create(this.injector);
    inputComponent.instance.declared =
      "Factory extending InspectorComponent Passed From App Component";
    inputComponent.instance.value = `
      This inspector was created in the child component
      so sees everything it provides!
    `;
    this.viewContainer.insert(inputComponent.hostView);

    // Have to force change detection again since we manipulated the structure of the view
    // and made it dirty after the check had already completed.
    this.cdr.detectChanges();
  }
}
