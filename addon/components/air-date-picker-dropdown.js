import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import formatDate from '../utils/format-date';
import LOCALE_EN from '../utils/locales/en';
import { once } from '@ember/runloop';

/**
 * @class AirDatePickerDropdown
 *
 * @param {Date} date
 * @param {boolean} range
 * @param {boolean} autoClose
 */
export default class AirDatePickerDropdown extends Component {
  range = this.args.range || false;
  datesApplied = false;
  dropdown = null;
  datepicker = null;

  @tracked
  initialSelectedDates = this.args.initialSelectedDates || null;

  @tracked
  newDate = this.args.selectedDates || null;

  @tracked
  updateOnConfirm = this.args.updateOnConfirm || false;

  @tracked
  date = this.args.selectedDates || null;

  @tracked
  _formattedDate = '';

  @action
  onDateSelect(date, formattedDate, dropdown) {
    if (this.updateOnConfirm == false || this.datesApplied == true) {
      this.datesApplied = false;
      this.date = date;
      this._formattedDate = formattedDate;

      if (this.args.autoClose == true) {
        if (this.args.onDateSelect) {
          if (this.range == true && date.length == 2) {
            this.args.onDateSelect(date, formattedDate);
          } else if (this.range == false) {
            this.args.onDateSelect(date, formattedDate);
          }
        }

        if (this.range == true && date.length == 2) {
          this.closeLater(dropdown);
        } else if (this.range == false) {
          this.closeLater(dropdown);
        }
      }
    } else {
      this.newDate = date;
      console.log('onDateSelect', date, formattedDate, this.datesApplied);
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

  @action
  setDates(dates) {
    this.newDate = dates;
    if (this.updateOnConfirm == true && this.datesApplied == true) {
      this.date = dates;
    } else if (this.updateOnConfirm == false) {
      this.date = dates;
    }
    this.datepicker.selectDate(dates);
  }

  @action
  applyDates() {
    this.datesApplied = true;
    this.datepicker.selectDate(this.newDate);
    this.closeLater(this.dropdown);
  }

  @action
  setupAirDatePicker(dropdown, element) {
    this.dropdown = dropdown;
    const initialize = () => {
      const self = this;
      const options = {
        locale: LOCALE_EN,
        range: this.args.range || false,
        autoClose: this.args.autoClose || true,
        minDate: this.args.minDate || '',
        maxDate: this.args.maxDate || '',
        onSelect({ date, formattedDate }) {
          if (self.onDateSelect) {
            self.onDateSelect(date, formattedDate, dropdown);
          }
        },
      };

      if (this.date) {
        options.selectedDates = [this.date];
      }

      // eslint-disable-next-line no-undef
      this.datepicker = new AirDatepicker(element, options);
    };
    once(initialize);
  }

  @action
  teardownAirDatePicker() {
    const destroy = () => {
      if (this.datepicker) {
        this.datepicker.destroy();
      }
    };
    once(destroy);
  }

  get unconfirmedFormattedDate() {
    return this.formatAndJoinDates(this.newDate);
  }

  get formattedDate() {
    if (this._formattedDate != '' && this._formattedDate != null) {
      return this._formattedDate;
    }
    return this.formatAndJoinDates(this.date);
  }

  get publicAPI() {
    return {
      actions: {
        setDates: this.setDates,
        applyDates: this.applyDates,
      },
    };
  }

  formatAndJoinDates(dates) {
    if (dates.length >= 2) {
      return dates
        .map((item) => {
          return formatDate(item, 'MM/dd/yyyy');
        })
        .join(',');
    }
    return formatDate(dates, 'MM/dd/yyyy');
  }
}
