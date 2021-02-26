import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './serviceWorker';
import Counter from './Counter';

ReactDOM.render( // 브라우저의 실제 DOM 내부에 컴포넌트를 렌더링하겠다
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Counter/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
