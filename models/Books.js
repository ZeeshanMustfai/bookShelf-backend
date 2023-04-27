var mongoose = require('mongoose')

const schema = mongoose.Schema;
const bookSchema = new schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: schema.Types.ObjectId, ref: 'user'
  },
  authorName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    require: false
  },
  publicationHouse: {
    type: String,
    required: false,
    default: 'Lasani Publication'
  },
  publicationDate: {
    type: Date,
    required: false,
    default: Date.now()
  },
  publicationYear: {
    type: String,
    required: false,
    default: '2023'
  },
  status:{
    type: String,
    default: 'Plan To Read'
  }
},
{
  timestamps: true,
}
)

module.exports = mongoose.model("books", bookSchema);