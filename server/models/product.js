const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);


const reviewSchema = Mongoose.Schema(
  {
    rating: { type: Number, },
    comment: { type: String, },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

// Product Schema
const ProductSchema = new Schema({
  sku: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  slug: { type: String, slug: 'name', unique: true },
  image: {
    type: String
  },
  imageKey: {
    type: String
  },
  imageUrl:{
    type:String
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  taxable: {
    type: Boolean,
    default: false
  },

  reviews: [reviewSchema],

  comments:{
    type:[String]
  },

  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});







// ProductSchema.post('init', async function (doc) {
//   // Transform doc as needed here.  "this" is also the doc.
//   const docToUpdate = await this.findOne();
//   console.log('docToUpdate ',docToUpdate);
//   // doc();
// })




module.exports = Mongoose.model('Product', ProductSchema);
