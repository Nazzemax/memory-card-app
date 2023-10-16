import Button from "../shared/Button"
import Logo from '../../assets/logo.svg'

const Header = () => {
  return (
        <div className="container shadow-header-shadow flex items-center justify-between max-h-16 h-16">
            <img src={Logo} alt="logo" />
            <Button />
        </div>
  )
}

export default Header