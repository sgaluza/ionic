import {Component, Optional, Attribute, ElementRef, Input, Renderer, HostListener} from 'angular2/core';
import {NgControl} from 'angular2/common';

import {Form} from '../../util/form';
import {Item} from '../item/item';

/**
 * The checkbox is no different than the HTML checkbox input, except it's styled differently.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/core/Form-interface.html) for more info on forms and input.
 *
 * @property [checked] - whether or not the checkbox is checked (defaults to false)
 * @property [value] - the value of the checkbox component
 * @property [disabled] - whether or not the checkbox is disabled or not.
 *
 * @usage
 * ```html
 * <ion-checkbox checked="true" value="isChecked" ngControl="htmlCtrl">
 *   HTML5
 * </ion-checkbox>
 * ```
 * @demo /docs/v2/demos/checkbox/
 * @see {@link /docs/v2/components#checkbox Checkbox Component Docs}
 */
@Component({
  selector: 'ion-checkbox',
  template:
    '<div class="checkbox-icon" [class.checkbox-checked]="_checked" [class.checkbox-disabled]="_disabled">' +
      '<div class="checkbox-inner"></div>' +
    '</div>' +
    '<button role="checkbox" ' +
            '[id]="_id" ' +
            '[attr.aria-checked]="_checked" ' +
            '[attr.aria-labelledby]="_labelId" ' +
            '[attr.aria-disabled]="_disabled" ' +
            'class="item-cover" ' +
            'role="checkbox">' +
    '</button>'
})
export class Checkbox {
  private _checked: any = false;
  private _disabled: any = false;
  private _id: string;
  private _labelId: string;

  @Input() value: string = '';

  constructor(
    private _form: Form,
    private _elementRef: ElementRef,
    private _renderer: Renderer,
    @Optional() private _ngControl: NgControl,
    @Optional() private _item: Item
  ) {
    _form.register(this);

    if (_ngControl) {
      _ngControl.valueAccessor = this;
    }

    let itemId = this._item.register('checkbox');
    this._id = 'chk-' + itemId;
    this._labelId = 'lbl-' + _item.id;
  }

  /**
   * @private
   * Toggle the checked state of the checkbox. Calls onChange to pass the updated checked state to the model (Control).
   */
  toggle() {
    this.checked = !this.checked;
  }

  @Input()
  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = (val === true || val === 'true');
    this.onChange(this._checked);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
    this._disabled = (val === true || val === 'true');
  }

  /**
   * @private
   */
  @HostListener('click', ['$event'])
  _click(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.toggle();
  }

  /**
   * @private
   * Angular2 Forms API method called by the model (Control) on change to update
   * the checked value.
   * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
   */
  writeValue(value) {
    this.checked = value;
  }

  /**
   * @private
   */
  onChange(val) {
    // TODO: figure the whys and the becauses
  }

  /**
   * @private
   */
  onTouched(val) {
    // TODO: figure the whys and the becauses
  }

  /**
   * @private
   * Angular2 Forms API method called by the view (NgControl) to register the
   * onChange event handler that updates the model (Control).
   * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
   * @param {Function} fn  the onChange event handler.
   */
  registerOnChange(fn) { this.onChange = fn; }

  /**
   * @private
   * Angular2 Forms API method called by the the view (NgControl) to register
   * the onTouched event handler that marks model (Control) as touched.
   * @param {Function} fn  onTouched event handler.
   */
  registerOnTouched(fn) { this.onTouched = fn; }

  /**
   * @private
   */
  ngOnDestroy() {
    this._form.deregister(this);
  }
}
