import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
         lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        verifyOtp: {
            type: String,
            default: '',
        },
        verifyOtpExpireAt: {
            type: Number,
            default: 0,
        },
        isAccountVerified: {
            type: Boolean,
            default: false,
        },
        resetOtp: {
            type: String,
            default: '',
        },
         resetOtpExpireAt: {
            type: Number,
            default: 0,
        },
           // ✅ Role field
        role: {
            type: String,
            enum: ["user", "admin"], // you can add more roles later
            default: "user",
    },
    cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, default: 1 },
      variant: { type: String }
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;