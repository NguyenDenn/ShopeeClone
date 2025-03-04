import Header from '~/Components/Header'
import RegisterFooter from '~/Components/RegisterFooter'

interface Props {
  children: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <RegisterFooter />
    </div>
  )
}
