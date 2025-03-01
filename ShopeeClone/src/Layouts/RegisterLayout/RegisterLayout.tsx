import RegisterFooter from '~/Components/RegisterFooter'
import RegisterHeader from '~/Components/RegisterHeader'

interface Props {
  children: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <RegisterFooter />
    </div>
  )
}
