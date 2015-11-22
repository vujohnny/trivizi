'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ThingSchema = new Schema({
    timeStamp: Date,
    budget: Number,
    activeDate: Date,
    departDate: Date,
    specificLocation: String,
    category: String,
    headCount: Number,
    active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);