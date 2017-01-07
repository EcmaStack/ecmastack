import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    console.log(this.homeHeader)
  }
});
