import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        section: z.number(),
        maxCapacity: z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; //HH:MM 00-23 :00-59
            return regex.test(time)
        }, {
            message: 'Invalid time format, expect HH:MM in 24h'
        }),
        endTime: z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; //HH:MM 00-23 :00-59
            return regex.test(time)
        }, {
            message: 'Invalid time format, expect HH:MM in 24h'
        })
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`) // startTime: 10:30 => 1970-01-01T10:30:00
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
    },{
        message: "Start time should be before End time!"
    })
});
const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.array(z.enum([...Days] as [string, ...string[]]).optional()),
        startTime: z.string().optional(),
        endTime: z.string().optional()
    })
});

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}