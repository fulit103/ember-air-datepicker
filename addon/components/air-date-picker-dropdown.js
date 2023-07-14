import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import formatDate from '../utils/format-date';

/**
 * @class AirDatePickerDropdown
 *
 * @param {Date} date
 * @param {boolean} range
 * @param {boolean} autoClose
 */
export default class AirDatePickerDropdown extends Component {
  range = this.args.range || false;

  @tracked
  date = this.args.selectedDates || null;

  @tracked
  _formattedDate = '';

  @action
  onDateSelect(dropdown, date, formattedDate) {
    this.date = date;
    this._formattedDate = formattedDate;

    if (this.args.autoClose == true) {
      if (this.args.onDateSelect) {
        if (this.range == true && date.length == 2) {
          this.args.onDateSelect(date, formattedDate, dropdown);
        } else if (this.range == false) {
          this.args.onDateSelect(date, formattedDate, dropdown);
        }
      }

      if (this.range == true && date.length == 2) {
        this.closeLater(dropdown);
      } else if (this.range == false) {
        this.closeLater(dropdown);
      }
    }
  }

  @action
  closeLater(dropdown) {
    this.closeTimer = later(() => {
      this.closeTimer = null;
      dropdown.actions.close();
    }, 100);
  }

  @action
  onClose() {
    console.log('onClose');
  }

  get formattedDate() {
    if (this._formattedDate != '' && this._formattedDate != null) {
      return this._formattedDate;
    }

    if (this.date.length >= 2) {
      return this.date
        .map((item) => {
          return formatDate(item, 'MM/dd/yyyy');
        })
        .join(',');
    }

    return formatDate(this.date, 'MM/dd/yyyy');
  }
}
