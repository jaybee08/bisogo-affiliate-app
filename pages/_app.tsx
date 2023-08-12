// pages/_app.tsx
import Image from 'next/image';

function MyApp({ Component, pageProps }) {
  // Your custom app component code (layout and functionality)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* Rest of your custom layout */}
      </main>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
