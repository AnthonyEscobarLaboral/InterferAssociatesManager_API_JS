import { Schema, model } from "mongoose";

const companySchema = Schema({
    name: {
        type: String,
        required: [true, "Company name is required"],
        maxLength: [100, "Company name cannot exceed 100 characters"]
    },
    category: {
        type: String,
        required: [true, "Company category is required"]
    },
    location: {
        type: Number,
        required: [true, "Company locations address is required"]
    },
    creation: {
        type: Number,
        required: [true, "Company creation-foundation year is required"]
    },
    impact: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"],
        required: [true, "Level of impact required, it can be: HIGH - MEDIUM - LOW "]
    },
    yearsInBusiness: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        versionKey: false,
        timestamps: true
    });

companySchema.methods.toJSON = function () {
    const { _id, ...companyDb } = this.toObject();
    companyDb.cid = _id;
    return companyDb;
};

export default model("Company", companySchema);
