import { z } from 'zod';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required')
    .max(20, 'Maximum allowed length is 20'),
  middleName: z.string().trim().min(1, 'Middle Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father Occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father Contact Number is required'),
  motherName: z.string().trim().min(1, 'Mother name is required'),
  motherOccupation: z.string().optional(),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother Contact Number is required'),
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    // id: z.string().optional(),
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message:
            "The gender field can only be one of the following 'male','female', or 'other'.",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImage: z.string().optional(),
      // isActive: z.enum(['active', 'inactive']).default('active'),
      // isDeleted: z.boolean().default(false)
    }),
  }),
});

// UserName schema
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required')
    .max(20, 'Maximum allowed length is 20')
    .optional(),
  middleName: z.string().trim().min(1, 'Middle Name is required').optional(),
  lastName: z.string().trim().min(1, 'Last Name is required').optional(),
});

// Guardian schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father name is required').optional(),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, 'Father Occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father Contact Number is required')
    .optional(),
  motherName: z.string().trim().min(1, 'Mother name is required').optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother Contact Number is required')
    .optional(),
});

// LocalGuardian schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required").optional(),
  occupation: z
    .string()
    .min(1, "Local guardian's occupation is required")
    .optional(),
  contactNo: z
    .string()
    .min(1, "Local guardian's contact number is required")
    .optional(),
  address: z.string().min(1, "Local guardian's address is required").optional(),
});

// Student schema
const updateStudentValidationSchema = z.object({
  body: z
    .object({
      // id: z.string().optional(),
      password: z.string().max(20).optional(),
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          gender: z
            .enum(['male', 'female', 'other'], {
              errorMap: () => ({
                message:
                  "The gender field can only be one of the following 'male','female', or 'other'.",
              }),
            })
            .optional(),
          dateOfBirth: z.string().optional(),
          email: z
            .string()
            .email('Invalid email address')
            .min(1, 'Email is required')
            .optional(),
          contactNo: z.string().min(1, 'Contact number is required').optional(),
          emergencyContactNo: z
            .string()
            .min(1, 'Emergency contact number is required')
            .optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          presentAddress: z
            .string()
            .min(1, 'Present address is required')
            .optional(),
          permanentAddress: z
            .string()
            .min(1, 'Permanent address is required')
            .optional(),
          guardian: updateGuardianValidationSchema.optional(),
          localGuardian: updateLocalGuardianValidationSchema.optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
