import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Examples extends Component {
  @tracked
  _date = [new Date()];

  @tracked
  _rangeDate = [new Date(), this.addDays(new Date(), 4)];

  @tracked showCustomInput = false;

  get date() {
    return this._date;
  }

  get rangeDate() {
    return this._rangeDate;
  }

  get minDate() {
    return this.addDays(new Date(), -60);
  }

  get maxDate() {
    return this.addDays(new Date(), 1);
  }

  addDays(date, days) {
    let result = new Date(date); // create a new Date object to avoid modifying the original one
    result.setDate(result.getDate() + days);
    return result;
  }

  @action
  onDateSelect(date) {
    console.log('what is date?' + date);
    this._date = date;
  }

  @action
  onDateRangeSelect(date) {
    console.log('what is date?' + date);
    this._rangeDate = date;
  }

  @action
  clickLastXDays(dp, days) {
    this.showCustomInput = false;
    dp.actions.setDates([this.addDays(new Date(), -days), new Date()]);
  }
}
