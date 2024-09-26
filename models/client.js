var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

var clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required"],
    },
    companyName: {
      type: String,
    },
    mobileNo: {
      type: String,
      unique: [true, "Mobile must be unique"],
      trim: true,
      required: [true, "Mobile is required"],
    },
    password: {
      type: String,
      required: [true, "Passowrd is required"],
    },

    activeSubcription: {
      subcriptionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Subcriptions",
      },
      transactionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Transactions",
      },
      validFrom: { type: Date, require: [true, "Valid From is required"] },
      validTo: { type: Date, require: [true, "Valid To is required"] },
    },
    subcriptionHistory: [
      {
        subcriptionId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Subcriptions",
        },
        transactionId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Transactions",
        },
        validFrom: { type: Date, require: [true, "Valid From is required"] },
        validTo: { type: Date, require: [true, "Valid To is required"] },
      },
    ],
    tradeLicenseUrl: {
      type: String,
    },
    vatCertificateUrl: {
      type: String,
    },
    licenseType: {
      type: String,
    },
    companyType: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    TRNO: {
      type: String,
      unique: [true, "TRNO must be unique"],
      required: [true, "TRNO is required"],
    },

    bankDetails: {
      accountName: {
        type: String,
      },
      bankName: {
        type: String,
      },
      branchName: {
        type: String,
      },
      accountNumber: {
        type: Number,
        unique: [true, "Account Number must be unique"],
        required: [true, "Account Number is required"],
      },
      IBAN: {
        type: String,
        unique: [true, "IBAN must be unique"],
        required: [true, "IBAN is required"],
      },

      swiftCode: {
        type: String,
      },
    },

    role: {
      type: String,
      default: "CLIENT",
    },
    caId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Accountants",
    },
    caName: {
      type: String,
      trim: true,
    },
    supplyPlace: {
      type: String,
    },
    issueDate: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    currency: {
      type: String,
    },
    addressline2: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pobox: {
      type: String,
    },
    landline: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    messagesSent: { type: Number, default: 0 },
    messagesReceived: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

clientSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique. {VALUE} already exists",
});
const Clients = mongoose.model("Clients", clientSchema);
module.exports = Clients;
