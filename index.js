const express = require('express')
const app = express();
const path = require('path')
const Campground = require('./models/campground_model')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')



mongoose.connect('mongodb://localhost:27017/campground', { useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log('database connected'))
  .catch(() => console.log("error connecting in database"))

app.engine('ejs', ejsMate);
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));



app.get('/', (req, res)=> {
    res.send('home page')
})

app.get('/campgrounds',async (req, res)=> {
    const campgrounds =await  Campground.find({})
    res.render('campgrounds/index',{campgrounds})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id/edit',async(req, res)=> {
    const {id} = req.params;
    const campground =await  Campground.findById(id)
    res.render('campgrounds/edit',{campground})
})


app.post('/campgrounds',async (req, res)=> {
    const new_campground = new Campground(req.body);
    await new_campground.save()
    res.redirect(`/campgrounds/${new_campground._id}`)
})



app.get('/campgrounds/:id',async (req, res)=> {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/details', {campground})
})

//update
app.put('/campgrounds/:id',async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id', async( req, res)=> {
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})




app.listen('3000', ()=> {
    console.log('started listening on 3000')
})