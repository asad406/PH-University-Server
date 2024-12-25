import { model, Schema, Types } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourse: [preRequisiteCoursesSchema],

    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

export const Course = model<TCourse>('Course', courseSchema)



const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course', // Referencing the 'Course' model
        unique: true
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: 'Faculty', // Referencing the 'Faculty' model
    }]
})

export const CourseFaculty = model<TCourseFaculty>('CourseFaulty', courseFacultySchema)