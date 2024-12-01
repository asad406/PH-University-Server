import { model, Schema } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true, // trim delete white space 
    maxLength: [20, 'Maximum allowed length is 20'],
    required: [true, 'First Name is required'],
  },
  middleName: {
    type: String,
    trim: true, // trim delete white space 
    required: true,
    // validate: {
    //   validator: function(value){
    //     const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //     return lastNameStr !== value
    //   },
    //   message: '{VALUE} is not in capitalize format.'
    // }
  },
  lastName: {
    type: String,
    trim: true, // trim delete white space 
    required: [true, 'Last Name is required'],
  },
},
  {
    toJSON: {
      virtuals: true,
    }
  }

);

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true, // trim delete white space 
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true, // trim delete white space 
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true, // trim delete white space 
    required: [true, 'Father Contract Number is required'],
  },
  motherName: {
    type: String,
    trim: true, // trim delete white space 
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contract Number is required'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
//Main Student Schema
const studentSchema = new Schema<TStudent>({
  id: { type: String, unique: true },
  // password: { type: String, required: [true, 'password is must required'], max: [20, 'Password can not be more then 20 char'] },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    unique: true,
    ref: 'User'
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is must required'],
  },
  gender: {
    type: String,
    enum: { values: ['male', 'female', 'other'], message: "The gender field can only be one of the following 'male','female', or 'other'." },
    required: true
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value:string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type'
    // }
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true
  },
  profileImage: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}
);


//Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//Mongoose Virtuals
userNameSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName}`
})

export const StudentModel = model<TStudent>('Student', studentSchema);
