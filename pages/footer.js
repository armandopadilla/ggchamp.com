import Link from 'next/link';

const footerStyle = {
  backgroundColor: '#eee',
  padding: '10px',
  color: '#000',
  fontFamily: 'arial',
  textAlign: 'center',
  fontSize: '15px',
  bottom: 0,
  width: '100%'
};


export default () => {
  return (
    <div style={footerStyle}>
      <div>ggchamp.com copyright 2019</div>
      <div><a href="/terms">Terms of Use</a> | <a href="/privacy-policy">Privacy Policy</a></div>
    </div>
  )
}