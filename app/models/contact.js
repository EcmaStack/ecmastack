import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  company: DS.attr('string'),
  phone: DS.attr('string'),
  message: DS.attr('string'),
  timestamp: DS.attr('number')
});
