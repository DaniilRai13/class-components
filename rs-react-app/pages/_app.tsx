import { AppProps } from 'next/app';
import MainProvider from 'providers/MainProvider';
import "index.css"
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainProvider>
      <Component props={pageProps} />
    </MainProvider>
  );
};

export default App;
