import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChildComponent } from "./child/child.component";
import { InspectorComponent } from "./inspector/inspector.component";
import { WrapperComponentComponent } from "./wrapper-component/wrapper-component.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    ChildComponent,
    InspectorComponent,
    WrapperComponentComponent,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
