import {Directive, Renderer2, ElementRef} from "@angular/core";

@Directive({
    selector: '[autoGrow]',
    host: {
        '(focus)': 'onFocus()',
        '(blur)': 'onBLur()'
    }
})

export class AutoGrowDirective {
    constructor(private element: ElementRef, private render: Renderer2) {
        console.log(element);
    }

    onFocus() {
        this.render.setStyle(this.element, 'width', '200');
    }

    onBlur() {
        this.render.setStyle(this.element, 'width', '100');
    }
}