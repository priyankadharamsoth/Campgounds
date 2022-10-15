const path = require('path')
const Campground = require('../models/campground_model')
const mongoose = require('mongoose')
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/campground', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('connection open for mongo'))
  .catch(() => console.log("error in connecting with mongo"))

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i= 0; i<50; i++){
        const rand = Math.floor(Math.random()* descriptors.length)
        const camp = new Campground({
            title: `${descriptors[rand]} ${places[rand]}`,
            location: `${cities[i].name} ${cities[i].state}`
        })
        await camp.save();
    }
}
seedDB();


