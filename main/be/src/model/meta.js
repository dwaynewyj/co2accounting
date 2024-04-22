let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const MetaSchema = mongoose.Schema(
  {
    import_status: {
      type: Number,
      enum: [0.1],
      required: true,
    },
    client_loc_id: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    last_expense_id: {
      type: String,
      required: false,
    },
  },
  { _id: false },
);

module.exports = mongoose.model("Meta", MetaSchema);
