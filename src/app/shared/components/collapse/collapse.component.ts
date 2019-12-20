import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'collapse',
    styleUrls: ['collapse.component.scss'],
    template: `
      <div class="">
        <div class="justify-content-between align-items-center collapse" (click)="toggleCollapse()">
            <ng-content select="[collapse-header]"></ng-content>
            <div class="justify-content-between align-items-center">
                <span class="collapse--arrow-caption">
                    {{ this.isExpanded? collapseCaption : expandCaption }}
                </span>
                <span class="collapse--mat-icon">
                    <mat-icon>
                        {{ this.isExpanded? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
                    </mat-icon>
                </span>
            </div>
        </div>
        <div *ngIf="this.isExpanded">
          <ng-content select="[collapse-body]"></ng-content>
        </div>
      <div>
      `,
})

export class CollapseComponent implements OnInit {
    @Input() expandCaption: string;
    @Input() collapseCaption: string;

    public isExpanded: boolean = false;

    constructor() {}

    ngOnInit() {}

    toggleCollapse() {
        this.isExpanded = !this.isExpanded;
    }
}
