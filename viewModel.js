const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    viewDate: {
        type: Date,
        required: true,
    },
    ProductId: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('view', DoctorSchema)
