import Ember from 'ember';

export default Ember.Component.extend({
  selectedSlide: 1, 
  actions: {
    load(slide) {
      this.set('selectedSlide', slide);
      console.log(this);
    }
  }
});
