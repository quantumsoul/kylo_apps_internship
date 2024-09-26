const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const reciptSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      req: true,
    },
    clientId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    type: {
      type: String,
      default: "Recipt",
    },
    DOC_TYPE: {
      type: String,

      trim: true,
    },
    DOC_NO: {
      type: String,
      default: "R1",
      trim: true,
    },
    DOC_DT: {
      type: String,

      trim: true,
    },
    Instrument_No: {
      type: String,
      default: "R1",
      trim: true,
    },
    billId: {
      type: String,
    },
    Narration: {
      type: String,

      trim: true,
    },
    isDrafted: {
      type: Boolean,
    },
    invoiceStatus: {
      type: String,
    },
    ReceiptId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    openingBalance: {
      type: Number,
      trim: true,
    },
    Allledgerentries_list: [
      {
        ledger_name: {
          type: String,

          trim: true,
        },
        ledger_id: {
          type: Number,

          trim: true,
        },
        debit_amount: {
          type: Number,

          trim: true,
        },
        ledger_group: {
          type: String,

          trim: true,
        },
        credit_amount: {
          type: Number,

          trim: true,
        },
        billallocation_list: [
          {
            reference_name: {
              type: String,
              trim: true,
            },
            debit_amount: {
              type: Number,
              trim: true,
            },
            credit_amount: {
              type: Number,
              trim: true,
            },
          },
        ],
      },
      {
        ledger_name: {
          type: String,

          trim: true,
        },
        ledger_id: {
          type: Number,

          trim: true,
        },
        debit_amount: {
          type: Number,

          trim: true,
        },
        credit_amount: {
          type: Number,

          trim: true,
        },
      },
    ],
  },
  { versionKey: false }
);
const Recipt = mongoose.model("Recipt", reciptSchema);
module.exports = Recipt;
