import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 *
 */
export default class AirDatePickerDropdownHeader extends Component {
  @action
  setDates(dates) {
    // this.args.dp.actions.setDates(this.args.dp, dates);
    this.args.dp.actions.setDates(dates);
  }
}
