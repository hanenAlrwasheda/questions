import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import data from './data.json'
import './main.html';
import './page.html';


Template.page.onCreated(function pageOnCreated() {
  this.questionIndex = new ReactiveVar(0);
  this.question = new ReactiveVar(data[Template.instance().questionIndex.get()].question);
});

Template.page.onRendered(function pageOnRendered() {
  $('.prev').attr("disabled", "disabled");
});

Template.page.helpers({
  question() {
    return Template.instance().question.get();
  },
  questionIndex() {
    return Template.instance().questionIndex.get();
  },
  currentQuestion() {
    return Template.instance().questionIndex.get() + 1;
  },
  totalQuestionNumber() {
    return data.length;
  },
  currentQuestionOptions() {
    return data[Template.instance().questionIndex.get()].options;
  }
});
Template.page.events({
  'click .prev'(event, instance) {
    const questionIndex = instance.questionIndex;
    if (questionIndex.get() !== 0) {
      questionIndex.set(questionIndex.get() - 1);
      instance.question.set(data[questionIndex.get()].question);
    }
    if (questionIndex.get() === 0) {
      $('.prev').attr("disabled", "disabled");
    }
    if (questionIndex.get() === data.length - 2) {
      $('.next').removeAttr("disabled");
    }
  },
  'click .next'(event, instance) {
    const questionIndex = instance.questionIndex;
    if (questionIndex.get() !== data.length - 1) {
      questionIndex.set(questionIndex.get() + 1);
      instance.question.set(data[questionIndex.get()].question);
    }
    if (questionIndex.get() === 1) {
      $('.prev').removeAttr("disabled");
    }
    if (questionIndex.get() === data.length - 1) {
      $('.next').attr("disabled", "disabled");
    }
  },
  'click .option'(event, instance) {
    //check if any item has already been chosen
    $('.options').children().toArray().forEach(op => {
      op.classList.remove('selected')
    });
    $(event.target).addClass('selected') //set color to selected item
  }
});