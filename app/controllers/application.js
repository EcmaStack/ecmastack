import Ember from 'ember';

export default Ember.Controller.extend({
  currentPathDidChange: function() {
    this.set('homeHeader', this.currentPath === 'index' ? true : false);
    this.set('route', this.currentPath);
  }.observes('currentPath'),
});
