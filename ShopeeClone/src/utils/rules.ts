import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_max !== '' || price_min !== '  '
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Nhập email là bắt buộc ')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài email phải từ 5-160 kí tự')
    .max(160, 'Độ dài email phải từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Nhập mật khẩu là bắt buộc')
    .min(6, 'Độ dài mật khẩu phải từ 6-160 kí tự')
    .max(160, 'Độ dài mật khẩu phải từ 6-160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .min(6, 'Độ dài mật khẩu phải từ 6-160 kí tự')
    .max(160, 'Độ dài mật khẩu phải từ 6-160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})
export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
