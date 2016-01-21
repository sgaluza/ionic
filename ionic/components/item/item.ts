import {Component, ContentChildren, ContentChild, Renderer, ElementRef} from 'angular2/core';

import {Button} from '../button/button';
import {Icon} from '../icon/icon';
import {Form} from '../../util/form';


/**
 * @name Item
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * There are three common ways to use an item:
 * - Use `<ion-item>` for something that is only non-clickable text.
 * - Use `<button ion-item>` for something that can be clicked/tapped. Typically this element will also have a `(click)` handler.
 * - Use `<a ion-item>` for when the item needs to contain a `href`.
 *
 * By default, `<button ion-item>` and `<a ion-item>` will receive a right arrow icon on iOS to signal that tapping the item will reveal more information.
 * To hide this icon, add the `detail-none` attribute to the item (eg: `<button ion-item detail-none>`). To add the icon when it is not displayed by default,
 * add the `detail-push` attribute (eg: `<ion-item detail-push>`).
 *
 *
 * @usage
 * ```html
 *
 * <ion-list>
 *
 *   // default item
 *   <ion-item>
 *     {{item.title}}
 *   </ion-item>
 *
 * </ion-list>
 *
 *  ```
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
@Component({
  selector: 'ion-item,[ion-item]',
  template:
    '<ng-content select="[item-left],ion-checkbox"></ng-content>' +
    '<div class="item-inner">' +
      '<ng-content select="ion-label"></ng-content>' +
      '<ion-label cnt>' +
        '<ng-content></ng-content>'+
      '</ion-label>' +
      '<ng-content select="[item-right],ion-radio,ion-toggle"></ng-content>' +
    '</div>',
  host: {
    'class': 'item'
  }
})
export class Item {
  private _inputs: Array<string> = [];
  private _ids: number = -1;
  id: string;

  constructor(form: Form, private _renderer: Renderer, private _elementRef: ElementRef) {
    this.id = form.nextId().toString();
  }

  register(type: string) {
    this._inputs.push(type);
    return this.id + '-' + (++this._ids);
  }

  setCssClass(cssClass, shouldAdd: boolean) {
    this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
  }

  @ContentChildren(Button)
  set _buttons(buttons) {
    buttons.toArray().forEach(button => {
      if (!button.isItem) {
        button.addClass('item-button');
      }
    });
  }

  @ContentChildren(Icon)
  set _icons(icons) {
    icons.toArray().forEach(icon => {
      icon.addClass('item-icon');
    });
  }
}

