import { NgModule, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChildComponent } from "./child/child.component";
import { InspectorComponent } from "./inspector/inspector.component";
import { WrapperComponentComponent } from "./wrapper-component/wrapper-component.component";
import { Provided } from "./injection-tokens";
import { EmbeddedDirective } from "./embedded/embedded.directive";
import { EmbeddedDefDirective } from "./embedded/embedded-def.directive";

@Injectable({
  providedIn: "root",
})
export class RootService implements Provided {
  providedBy = "app module using existing root instance";
  emoji = "🌺";
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    ChildComponent,
    InspectorComponent,
    WrapperComponentComponent,
    EmbeddedDirective,
    EmbeddedDefDirective,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: Provided, useExisting: RootService }],
})
export class AppModule {}
