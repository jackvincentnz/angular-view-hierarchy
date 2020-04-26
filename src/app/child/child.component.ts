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
} from "@angular/core";
import { Provided, ViewProvided } from "../injection-tokens";
import { InspectorComponent } from "../inspector/inspector.component";
import { EmbeddedDefDirective } from "../embedded/embedded-def.directive";
import { EmbeddedDirective } from "../embedded/embedded.directive";

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

  @Input()
  embeddedTemplate: TemplateRef<Context>;

  @Input()
  factory: ComponentFactory<InspectorComponent>;

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
    });

    // Add component directly
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

    // Add template from app-embedded
    this.viewContainer.createEmbeddedView(this.embeddedTemplate, this.context);

    // Add create and add component from component factory input
    const componentFromFactory = this.factory.create(this.injector);
    componentFromFactory.instance.declared =
      "Factory extending InspectorComponent Passed From App Component";
    componentFromFactory.instance.value = `
      This inspector was created in the child component
      so sees everything it provides!
    `;
    this.viewContainer.insert(componentFromFactory.hostView);

    // Have to force change detection since we manipulated the structure of the view
    // and made it dirty after the check had already completed.
    this.cdr.detectChanges();
  }
}
