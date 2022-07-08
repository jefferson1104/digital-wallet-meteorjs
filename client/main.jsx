import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { App } from '/imports/ui/App';

import "../imports/api/methods/ContactsMethods";
import "../imports/api/methods/TransactionsMethods";

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
