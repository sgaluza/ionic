import {Directive, ElementRef, Renderer, Input, Optional} from 'angular2/core';

import {Item} from '../item/item';


/**
 * @name Label
 * @description
 * Labels describe the data that the user should enter in to an input element.
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Username</ion-label>
 *   <input type="text" value="">
 * </ion-input>
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../Input Input API Docs}
 *
 */

@Directive({
  selector: 'ion-label',
  host: {
    '[id]': 'id'
  }
})
export class Label {
  @Input() id: string;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer,
    @Optional() _item: Item
  ) {
    if (_item) {
      this.id = 'lbl-' + _item.id;
    }
  }

  get text(): string {
    return this._elementRef.nativeElement.textContent;
  }

  /**
   * @private
   * @param {string} add class name
   */
  addClass(className: string) {
    this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
  }

}
