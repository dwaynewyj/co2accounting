let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const InfoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

let SCustomerSchema = new Schema(
  {
    users: {
      type: [UserSchema],
      required: false,
      default: [],
    },

    info: {
      type: InfoSchema,
      required: true,
    },

    plan_id: {
      type: String,
      required: true,
    },
    subscription_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SCustomer", SCustomerSchema);
