// pages/_app.tsx
import '../app/globals.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex items-center justify-center bg-white text-black h-full p-4">
      {/* Rest of your custom layout */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
