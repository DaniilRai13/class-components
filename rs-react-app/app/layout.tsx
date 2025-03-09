import "index.css";
import { Metadata } from 'next';
import MainProvider from 'providers/MainProvider';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'People App',
  icons: {
    icon: '/fav.ico',
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
