import { useRouter } from 'next/router'
import { tomato,black } from '../../utilities/color'
function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
      paddingRight:'10px',
      paddingLeft:'10px',
    // marginRight: 10,
    color: router.asPath === href ? tomato : black,
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink