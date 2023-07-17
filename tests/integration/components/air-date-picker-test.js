import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | air-date-picker', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<AirDatePicker />`);

    assert.dom('.air-datepicker--content').exists();
  });

  test('it fires onDateSelect', async function (assert) {
    this.set('onDateSelect', (date) => {
      assert.step('Test onDateSelect ' + date.getDate());
    });

    await render(hbs`
      <AirDatePicker @onDateSelect={{this.onDateSelect}} />
    `);

    await click('[data-date="1"]');

    assert.verifySteps(['Test onDateSelect 1']);
  });
});
