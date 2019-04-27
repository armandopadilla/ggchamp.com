// ./pages/_document.js
import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <html>
      <Head>
        <title>ggChamp.com</title>
      </Head>
      <body className="custom_class">
      <Main />
      <NextScript />
      </body>
      </html>
    )
  }
}