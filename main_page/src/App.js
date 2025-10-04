import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    // Валидация
    if (!url.trim()) {
      setError('Пожалуйста, введите URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Пожалуйста, введите корректный URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/parse-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleParse();
    }
  };

  return (
    <div className="app">
      <h1>Парсер текста</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите URL"
          className="url-input"
          disabled={loading}
        />
        <button 
          onClick={handleParse} 
          disabled={loading}
          className="parse-button"
        >
          {loading ? 'Загрузка...' : 'Парсить текст'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && (
        <div className="result-container">
          <h3>Результат:</h3>
          <pre className="result">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;