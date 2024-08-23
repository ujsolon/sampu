// pages/_app.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/global.css'; // Replace with your global stylesheet path

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
