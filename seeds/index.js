const path = require('path')
const Campground = require('../models/campground_model')
const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/campground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('connection open for mongo'))
    .catch(() => console.log("error in connecting with mongo"))

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand = Math.floor(Math.random() * descriptors.length)
        const price = Math.floor(Math.random()* 20)+10;
        const camp = new Campground({
            title: `${descriptors[rand]} ${places[rand]}`,
            location: `${cities[i].name} ${cities[i].state}`,
            image: 'http://source.unsplash.com/collection/484351',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi atque quis illo rem, nemo cumque veniam nulla, odio, optio neque mollitia nam laudantium ducimus. Delectus totam dolorum consequuntur qui molestiae.',
            price: price
        })
        await camp.save();
    }
}
seedDB();


