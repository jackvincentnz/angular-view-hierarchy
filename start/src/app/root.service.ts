import { Injectable } from "@angular/core";
import { Provided } from "./injection-tokens";

@Injectable({
  providedIn: "root",
})
export class RootService implements Provided {
  providedBy = "root module";
  emoji = "🌺";
}
