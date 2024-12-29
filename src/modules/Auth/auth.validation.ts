import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is required',
    }),
    newPassword: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
const forgetPasswordTokenValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
  }),
});
const resetPasswordTokenValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
    newPassword: z.string({
      required_error: 'User password is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordTokenValidationSchema,
  resetPasswordTokenValidationSchema,
};

// http://localhost:3000/?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzU0MzcxMjksImV4cCI6MTczNTQzNzcyOX0.RJJdUHaMM-NZSAcxHRJNtbwURgayjO_MGRJDNxST-u4
