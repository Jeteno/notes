/// <reference types="react" />
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement: Element | null = document.getElementById('root');

ReactDOM.render(<App />, rootElement);