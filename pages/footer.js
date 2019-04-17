import Link from 'next/link';

const footerStyle = {
  backgroundColor: '#eee',
  padding: '10px',
  color: '#000',
  fontFamily: 'arial',
  textAlign: 'center',
  fontSize: '15px',
};


export default () => {
  return (
    <div style={footerStyle}>
      <div>ggchamp.com copyright 2019-infinity</div>
    </div>
  )
}