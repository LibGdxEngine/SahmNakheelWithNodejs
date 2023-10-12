import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ar">
        <Head>
          {/* <link rel="shortcut icon" href="/images/letaskono_logo.png" /> */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap"></link>
          <mate charSet="UTF-8" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
