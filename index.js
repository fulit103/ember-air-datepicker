'use strict';

module.exports = {
  name: require('./package').name,

  // eslint-disable-next-line no-unused-vars
  included(_app) {
    this._super.included.apply(this, arguments);
    const vendorPath = 'vendor/air-datepicker';

    this.import(`${vendorPath}/air-datepicker.js`);
    this.import(`${vendorPath}/air-datepicker.css`);
  },

  // eslint-disable-next-line no-unused-vars
  treeForVendor(_defaultTree) {
    const Funnel = require('broccoli-funnel');
    const mergeTrees = require('broccoli-merge-trees');
    const path = require('path');

    const distPath = path.dirname(require.resolve('air-datepicker'));

    let browserVendorLib = new Funnel(distPath, {
      destDir: 'air-datepicker',
      files: ['air-datepicker.js'],
    });

    let defaultCSS = new Funnel(distPath, {
      destDir: 'air-datepicker',
      include: ['air-datepicker.css'],
    });

    let nodes = [browserVendorLib, defaultCSS];

    return new mergeTrees(nodes);
  },
};
