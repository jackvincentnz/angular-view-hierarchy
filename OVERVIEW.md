```
AppModule
    <app-root>
        <app-wrapper>
            <app-child>

                <ng-content></ng-content>
                <ng-container *ngFor=""></ng-container>
                <ng-container #containerRef></ng-container>

            </app-child>
        </app-wrapper>
    </app-root>

    ...

    <app-inspector></app-inspector>
```