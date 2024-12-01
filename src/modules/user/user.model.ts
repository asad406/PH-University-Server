import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))  
  })

  //set '' after saving the password
  userSchema.post('save', function (doc, next) {
    doc.password = ""
    next();
  })

export const User = model<TUser>('User', userSchema)