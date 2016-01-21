import {Component, Optional, Input, Output, HostListener, EventEmitter} from 'angular2/core';

import {Item} from '../item/item';
import {ListHeader} from '../list/list';
import {Form} from '../../util/form';
import {isDefined} from '../../util/util';
import {RadioGroup} from './radio-group';


/**
 * @description
 * A radio button with a unique value. Note that all `<ion-radio>` components
 * must be wrapped within a `<ion-list radio-group>`, and there must be at
 * least two `<ion-radio>` components within the radio group.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-radio value="my-value" checked="true">
 *   Radio Label
 * </ion-radio>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 */
@Component({
  selector: 'ion-radio',
  template:
    '<div class="radio-icon" [class.radio-checked]="_checked">' +
      '<div class="radio-inner"></div>' +
    '</div>' +
    '<button role="radio" ' +
            '[id]="id" ' +
            '[attr.aria-checked]="_checked" ' +
            '[attr.aria-labelledby]="_labelId" ' +
            '[attr.aria-disabled]="_disabled" ' +
            'class="item-cover">' +
    '</button>',
  host: {
    '[class.radio-disabled]': '_disabled'
  }
})
export class RadioButton {
  private _checked: any = false;
  private _disabled: any = false;
  private _labelId: string;

  id: string;

  @Input() value: string = '';
  @Output() select: EventEmitter<RadioButton> = new EventEmitter();

  constructor(
    private _form: Form,
    @Optional() private _item: Item,
    @Optional() private _group: RadioGroup
  ) {
    _form.register(this);

    if (_item) {
      this.id = 'rb-' + _item.register('radio');
      this._labelId = 'lbl-' + _item.id;
    }

    if (_group) {
      _group.register(this);
    }
  }

  toggle() {
    this.checked = !this._checked;
  }

  @Input()
  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = (val === true || val === 'true');
    this.select.emit(this);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
    this._disabled = (val === true || val === 'true');
    this._item && this._item.setCssClass('radio-disabled', val);
  }

  /**
   * @private
   */
  setChecked(val: boolean) {
    this._checked = val;
    this._item && this._item.setCssClass('radio-checked', val);
  }

  /**
   * @private
   */
  @HostListener('click', ['$event'])
  private _click(ev) {
    console.debug('RadioButton, select', this.value);
    ev.preventDefault();
    ev.stopPropagation();
    this.toggle();
  }

  /**
   * @private
   */
  ngOnDestroy() {
    this._form.deregister(this);
  }
}
