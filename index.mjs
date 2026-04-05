import express from 'express'
import Chance from 'chance'

const app = express()
const chance = new Chance()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: chance.name(),
        age: chance.age()
    })
})

app.get('/characters', (req, res) => {
    res.render('characters', { title: 'Characters', characters: null, query: '' })
})

app.post('/characters', async (req, res) => {
    let name = req.body.name
    let response = await fetch('https://rickandmortyapi.com/api/character/?name=' + encodeURIComponent(name))
    let data = await response.json()
    let characters = data.results ? data.results.slice(0, 6) : []
    res.render('characters', { title: 'Characters', characters, query: name })
})

app.get('/generator', (req, res) => {
    res.render('generator', { title: 'Generator', results: null, category: null })
})

app.post('/generator', (req, res) => {
    let category = req.body.category
    let results = []
    for (let i = 0; i < 5; i++) {
        if (category === 'names') results.push(chance.name())
        else results.push(chance.email())
    }
    res.render('generator', { title: 'Generator', results, category })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0");
