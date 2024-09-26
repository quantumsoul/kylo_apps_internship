const mongoose = require("mongoose");
const journalSchema = new mongoose.Schema(
  {
    DOC_TYPE: {
      type: String,
      req: true,
      default: "Journal",
    },
    DOC_NO: {
      type: String,
      req: true,
    },
    DOC_DT: {
      type: String,
      req: true,
    },
    supplierinvNo: {
      type: String,
      req: true,
    },
    supplierinvDate: {
      type: String,
      req: true,
    },
    Narration: {
      type: String,
      req: true,
    },
    clientId: {
      type: String,
      req: true,
    },

    Allledgerentries_list: [
      {
        ledger_name: {
          type: String,
          default: "IT Expenses",
          trim: true,
        },
        ledger_id: {
          type: String,
        },
        debit_amount: {
          type: Number,
          trim: true,
          default: 0,
        },
        credit_amount: {
          type: Number,
          default: 0,
          trim: true,
        },
        ledger_group: {
          type: String,
          default: "Indirect Expenses",
          trim: true,
        },
      },
      {
        ledger_name: {
          type: String,
          default: "Bank",
          trim: true,
        },
        ledger_id: {
          type: String,
        },
        debit_amount: {
          type: Number,
          trim: true,
          default: 0,
        },
        credit_amount: {
          type: Number,
          default: 0,
          trim: true,
        },
        ledger_group: {
          type: String,
          default: "Bank Account",
          trim: true,
        },
      },
    ],
  },
  { versionKey: false }
);
const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;
