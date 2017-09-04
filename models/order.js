const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// coming soon
const orderSchema = new Schema({
    item:{
      dish:{type:Schema.Types.ObjectId,ref:'dish'},
      quantity:{type:Number}
    },
    customer:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    chef:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    date:{
      type:Date,
      default:Date.now
    },
    detail:{
      type:String
    }
  }
);

const modelClass = mongoose.model('order', orderSchema);

module.exports = modelClass;