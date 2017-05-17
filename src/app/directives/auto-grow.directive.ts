import {Directive, Renderer2, ElementRef} from "@angular/core";

@Directive({
    selector: '[autoGrow]',
    host: {
        '(focus)': 'onFocus()',
        '(blur)': 'onBlur()'
    }
})

export class AutoGrowDirective {
    constructor(private element: ElementRef,
                private render: Renderer2) {
    }

    onFocus() {
        this.render.setStyle(this.element.nativeElement, 'width', '200px');
    }

    onBlur() {
        this.render.setStyle(this.element.nativeElement, 'width', '100px');
    }
}