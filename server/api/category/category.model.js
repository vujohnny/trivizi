'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    city: String,
    lat: Number,
    lng: Number,
    category: String,
    active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);
