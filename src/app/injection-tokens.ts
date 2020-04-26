import { forwardRef } from "@angular/core";

export abstract class Provided {
  providedBy: string;
  emoji: string;
}

export abstract class ViewProvided extends Provided {}

export abstract class Ancestor {
  name: string;
}

// Helper method to provide the current component instance in the name of a `ancestorType`.
// The `ancestorType` defaults to `Ancestor` when omitting the second parameter.
export function provideAncestor(component: any, ancestorType?: any) {
  return {
    provide: ancestorType || Ancestor,
    useExisting: forwardRef(() => component),
  };
}
