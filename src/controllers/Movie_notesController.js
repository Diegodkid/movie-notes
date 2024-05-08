const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class Movie_notesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    if(rating > 5) {
      throw new AppError('A nota máxima é 5')
    } 

    const [movie_id] = await knex('Movie_notes').insert({
      user_id,
      title,
      description,
      rating
    })

    const tagsInsert = tags.map(name => {
      return {
          note_id: movie_id,
          user_id,
          name
      }
    })

    await knex('Movie_tags').insert(tagsInsert)

    res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const note = await knex('Movie_notes').where({ id }).first()
    const tags = await knex('Movie_tags').where({ note_id: id}).orderBy('name')

    return res.json({
      ...note,
      tags
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('Movie_notes').where({ id }).delete()

    return res.json()
  }

  async index(req, res) {
    const { user_id } = req.params

    const notes = knex('Movie_notes').where({ user_id }).orderBy('title')

    res.json(notes)
  }
}

module.exports = Movie_notesController