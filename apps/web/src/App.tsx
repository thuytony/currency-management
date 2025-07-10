import CurrencyList from './components/CurrencyList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🏦 Currency Management</h1>
        <p>Hệ thống quản lý tiền tệ</p>
      </header>
      <main className="App-main">
        <CurrencyList />
      </main>
      <footer className="App-footer">
        <p>© 2024 Currency Management App</p>
      </footer>
    </div>
  );
}

export default App; 