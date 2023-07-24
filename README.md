# ember-api-datepicker

This is an Ember addon that wraps the [air-datepicker](https://air-datepicker.com/) JavaScript library. It provides a date picking component with a rich set of features including localization, date range selection, and automatic closure after date selection.

## Compatibility

* Ember.js v4.4 or above
* Ember CLI v4.4 or above
* Node.js v14 or above


## Installation

To install the addon, use the following command in your Ember project directory:

```
ember install ember-air-datepicker
```

## Usage

The `AirDatePicker` and `AirDatePickerDropdown` components can be used in your templates.

### AirDatePicker Component

- `range`: A boolean indicating whether the date picker should allow the selection of a date range. Default is `false`.
- `autoClose`: A boolean indicating whether the date picker should automatically close after a date is selected. Default is `true`.
- `onDateSelect`: An action that is called when a date is selected. The action is called with three arguments: the selected `date`, the `formattedDate` as a string, and the `datepicker` instance.

Here is an example of how to use the `AirDatePicker` component:

```handlebars
<AirDatePicker 
  @range={{this.isRange}} 
  @autoClose={{this.autoClose}} 
  @onDateSelect={{this.onDateSelectAction}}
/>
```

In this example, `this.isRange`, `this.autoClose`, and `this.onDateSelectAction` should be defined in your component's JavaScript file.

### AirDatePickerDropdown Component

The `AirDatePickerDropdown` component is a dropdown component that contains the `AirDatePicker`. It accepts the same arguments as `AirDatePicker`, as well as:

- `selectedDates`: An array of Date objects that sets the initially selected date(s).
- `onClose`: An action that is called when the dropdown is closed.

Here is an example of how to use the `AirDatePickerDropdown` component:



The `AirDatePickerDropdown` component is a dropdown component that contains the `AirDatePicker`. It accepts the same arguments as `AirDatePicker`, as well as:

- `selectedDates`: An array of Date objects that sets the initially selected date(s).
- `autoClose`: A boolean indicating whether the dropdown should automatically close after a date is selected. Default is `false`.
- `updateOnConfirm`: A boolean indicating whether the dropdown should update the date only on confirmation. Default is `false`.
- `onClose`: An action that is called when the dropdown is closed.

Here is an example of how to use the AirDatePickerDropdown component:

```handlebars
<AirDatePickerDropdown
  @selectedDates={{this.rangeDate}}
  @range={{true}}
  @autoClose={{false}}
  @updateOnConfirm={{true}}
  @onDateSelect={{this.onDateRangeSelect}}
  as |dp|
>
  <dp.Header>
    <div>
      <input aria-label="calendar1" type="radio" name="group1" {{ on 'click' (fn this.clickLastXDays dp 7) }}/>
      <label for="calendar1">Last 7 days</label>
    </div>
    <div>
      <input aria-label="calendar2" type="radio" name="group1" {{ on 'click' (fn this.clickLastXDays dp 15) }}/>
      <label for="calendar2">Last 15 days</label>
    </div>
    <div>
      <input aria-label="calendar3" type="radio" name="group1" {{ on 'click' (fn this.clickLastXDays dp 30) }}/>
      <label for="calendar3">Last 30 days</label>
    </div>
  </dp.Header>

  <dp.Footer>
    <button type="button" {{on "click" dp.actions.applyDates}}>Apply</button>
  </dp.Footer>

</AirDatePickerDropdown>
```

In this example, `this.rangeDate`, `this.onDateRangeSelect` and `this.clickLastXDays` should be defined in your component's JavaScript file. You can also provide custom Header and Footer content as shown.

Here's an example of how to define the `clickLastXDays` method in your JavaScript file:


```javascript
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DatePickerComponent extends Component {

  @action
  clickLastXDays(dp, days) {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - days);
    dp.actions.setDates([newDate, new Date()]);
  }
  
  // define other methods and actions here...
}
```

This method uses the `setDates` action of the date picker to set the selected dates range from today's date to the past number of days specified.

## License

This project is licensed under the [MIT License](LICENSE.md).
