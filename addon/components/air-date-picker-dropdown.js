import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

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
  date = null;

  @tracked
  formattedDate = '';

  @action
  onDateSelect(dropdown, date, formattedDate) {
    this.date = date;
    this.formattedDate = formattedDate;

    if (this.args.autoClose == true) {
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
}
