const express = require('express')
const Articles = require('./../models/articles')
const router = express.Router()

router.get('/new',(req,res) => {
    res.render('articles/new', {article: new Articles()})
})

router.get('/:id', async (req,res) => {
    const article = await Articles.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

router.post('/', async (req, res, next) => {
    req.article = new Articles()
    next()
  }, saveArticle('new'))


router.get('/edit/:id', async (req,res) => {
    const article = await Articles.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

router.delete('/:id', async (req,res) => {
    await Articles.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.put('/:id', async (req, res, next) => {
    req.article = await Articles.findById(req.params.id)
    next()
  }, saveArticle('edit'))


function saveArticle(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
      } catch (e) {
        res.render(`articles/${path}`, { article: article })
      }
    }
  }

module.exports = router;