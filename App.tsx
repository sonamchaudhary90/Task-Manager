import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './store/store';
import TaskManager from './TaskManager';

const App = () => {
  return (
    <Provider store={store}>
      {/* PersistGate ensures the UI waits until the persisted state is restored */}
      <PersistGate loading={null} persistor={persistor}>
        <TaskManager />
      </PersistGate>
    </Provider>
  );
};

export default App;
