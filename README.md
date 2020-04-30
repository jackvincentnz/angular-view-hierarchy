# angular-view-hierarchy

Examples of DI in action in an Angular view hierarchy

## Get Started

```
$ yarn
$ yarn start
```

## Overview

- Loosely covers concepts described in the Angular guide - [Hierarchical Dependency Injection](https://angular.io/guide/hierarchical-dependency-injection)
- Uncomment `providers: []` and `viewProviders: []` in the `app.module.ts`, `app.component.ts` and `child.component.ts` to see the effect of different dependency providing strategies.
- Copy inspectors from `README.inspectors.html` to their matching locations in the component templates to see what dependencies they are provided.
- Uncomment `viewContainer.insert` lines in `child.component.ts` to see `ViewContainerRef` view manipulation examples.
