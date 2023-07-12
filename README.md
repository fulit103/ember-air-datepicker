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

The `AirDatePicker` component can be used in your templates. It accepts the following arguments:

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


## License

This project is licensed under the [MIT License](LICENSE.md).
