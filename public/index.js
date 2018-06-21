/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",

      people: [],
      newPerson: {
        name: "",
        bio: "",
        bioVisible: false       
      }
    };
  },
  created: function() {
    axios
      .get('/api/people')
      .then(function(response) {
        this.people = response.data;
      }.bind(this));
  },
  methods: {
    addPerson: function() {
      if (this.newPerson.name && this.newPerson.bio) {
        var newPersonInfo = {
          name: this.newPerson.name,
          bio: this.newPerson.bio,
          bioVisible: this.newPerson.bioVisible
        };
        this.people.push(newPersonInfo);
        this.newPerson = '';
      }
    },
    numberOfPeople: function() {
      return this.people.length;
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});