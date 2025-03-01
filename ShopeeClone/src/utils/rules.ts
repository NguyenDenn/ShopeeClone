import * as yup from 'yup'
export const schema = yup.object({
  email: yup
    .string()
    .email('Nhập đúng địng dạng email')
    .min(5, 'Email phải từ 5 - 160 kí tự')
    .max(160, 'Email phải từ 5 - 160 kí tự')
    .required('Nhập email là bắt buộc'),
  password: yup
    .string()
    .min(6, 'Độ dài mật khẩu phải từ 6 - 160 kí tự')
    .max(160, 'Độ dài mật khẩu phải từ 6 - 160 kí tự')
    .required('Nhập mật khẩu là bắt buộc'),
  confirm_password: yup
    .string()
    .min(6, 'Độ dài mật khẩu phải từ 6 - 160 kí tự')
    .max(160, 'Độ dài mật khẩu phải từ 6 - 160 kí tự')
    .required('Nhập lại mật khẩu là bắt buộc')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})
export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
