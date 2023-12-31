import Component from '@glimmer/component';
import { action } from '@ember/object';
import { once } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import LOCALE_EN from '../utils/locales/en';

/**
 * AirDatePicker component
 *
 * @param {boolean} range - Enable date range selection
 * @param {boolean} autoClose - Close datepicker on date select
 * @param {function} onDateSelect - Callback function when date is selected
 */
export default class AirDatePicker extends Component {
  datepicker = null;

  @tracked
  initialSelectedDates = this.args.initialSelectedDates || null;

  @action
  setupAirDatePicker(element) {
    const initialize = () => {
      const self = this;
      const options = {
        locale: LOCALE_EN,
        range: this.args.range || false,
        autoClose: this.args.autoClose || true,
        firstDay: this.args.firstDay || 0,
        showOtherMonths: this.args.showOtherMonths || true,
        toggleSelected: ({ datepicker }) => {
          if (self.args.range == true) {
            if (datepicker.selectedDates.length == 2) {
              return true;
            }
            return false;
          }
          return true;
        },
        onSelect({ date, formattedDate, datepicker }) {
          if (self.args.onDateSelect) {
            self.args.onDateSelect(date, formattedDate, datepicker);
          }
        },
      };

      if (this.args.initialSelectedDates) {
        options.selectedDates = [this.args.initialSelectedDates];
      }

      if (this.args.minDate) {
        options.minDate = this.args.minDate;
      }

      if (this.args.maxDate) {
        options.maxDate = this.args.maxDate;
      }

      // eslint-disable-next-line no-undef
      this.datepicker = new AirDatepicker(element, options);

      if (
        this.args.setDatepicker &&
        typeof this.args.setDatepicker === 'function'
      ) {
        this.args.setDatepicker(this.datepicker);
      }
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

  get publicAPI() {
    return {
      setDates: (dates) => {
        this.datepicker.selectDate(dates);
      },
    };
  }
}
