import DS from 'ember-data';

var Project = DS.Model.extend({
  title: DS.attr("string"),
  description: DS.attr("string"),
  user: DS.belongsTo("user"),
  shots: DS.hasMany("shot", {async: true})
});

export default Project;
