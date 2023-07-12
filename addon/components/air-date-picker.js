import Component from '@glimmer/component';
import { action } from '@ember/object';
import { once } from '@ember/runloop';

const LOCALE_EN = {
  // eslint-disable-next-line prettier/prettier
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  // eslint-disable-next-line prettier/prettier
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  // eslint-disable-next-line prettier/prettier
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  clear: 'Clear',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'hh:mm aa',
  firstDay: 0,
};

export default class AirDatePicker extends Component {
  @action
  setupAirDatePicker(element) {
    const initialize = () => {
      // eslint-disable-next-line no-undef
      new AirDatepicker(element, {
        locale: LOCALE_EN,
        range: this.args.range || false,
        autoClose: this.args.autoClose || true,
        onSelect({ date, formattedDate, datepicker }) {
          if (this.args.onDateSelect) {
            this.args.onDateSelect(date, formattedDate, datepicker);
          }
        },
      });
    };
    once(initialize);
  }

  @action
  teardownAirDatePicker(element) {
    const destroy = () => {
      let datepicker = element.data('datepicker');
      if (datepicker) {
        datepicker.destroy();
      }
    };
    once(destroy);
  }
}
