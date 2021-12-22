import PropTypes from 'prop-types'


const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

//CSS in JS (pass an object to style={})
// const headingStyle = {
//   color: 'red', 
//   backgroundColor: 'black'
// }

export default Header
