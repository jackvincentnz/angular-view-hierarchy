import { forwardRef } from '@angular/core';

// Marker class, used as an interface
export abstract class Parent { name: string; }

// Helper method to provide the current component instance in the name of a `parentType`.
// The `parentType` defaults to `Parent` when omitting the second parameter.
export function provideParent
  (component: any, parentType?: any) {
    return { provide: parentType || Parent, useExisting: forwardRef(() => component) };
  }