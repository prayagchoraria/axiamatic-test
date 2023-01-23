import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header/Header';
import ProductsSelection from './components/ProductsSelection/ProductsSelection';

const queryClient = new QueryClient();

const App: React.FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-auto max-w-7xl px-4 py-2">
        <Header />
        <ProductsSelection />
      </div>
    </QueryClientProvider>
  );
};

export default App;
