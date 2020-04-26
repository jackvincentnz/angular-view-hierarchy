import { NgModule, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChildComponent } from "./child/child.component";
import { InspectorComponent } from "./inspector/inspector.component";
import { WrapperComponentComponent } from "./wrapper-component/wrapper-component.component";
import { Provided } from "./injection-tokens";

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
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: Provided, useExisting: RootService }],
})
export class AppModule {}
