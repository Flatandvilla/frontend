import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.union([z.string().email(), z.string().min(1, 'Username/Email is required')]),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const keywordschema = z.object({
  keywords: z.string().nonempty('Keyword(s) is required'),
  url: z.string().nonempty('URL is required'),
}).optional();

export const registrationSchema = z.object({
  username: z.string().min(1, 'Username is required'), 
  email: z.string().email(),
  password: z.string().min(8),
  password2: z.string().min(8),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["rePassword"], 
});


export const formSchema = z.object({
  firstDropdown: z.string().nonempty({ message: "This field is required" }),
  secondDropdown: z.array(z.string()).nonempty({ message: "This field is required" }),
});
