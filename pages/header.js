import Link from 'next/link';

const headerStyle = {
  general: {
    backgroundColor: '#aaa',
    padding: '5px',
    color: '#fff',
    fontFamily: 'arial',
    height: '25px'
  },
  title: {
    float: 'left',
    width: '10%',
    'a:link': {
      color: '#fff'
    }
  },
  links: {
    width: '*',
    float: 'right'
  }
};


export default () => {
  return (
    <div style={headerStyle.general}>
      <div style={ headerStyle.title }><Link href="/">xxxvyyy.com</Link></div>
      <div style={ headerStyle.links }>
        <Link href="/signup">Sign Up</Link> |
        <Link href="/login">Log In</Link></div>
    </div>
  )
}