import { h, render } from 'preact';
import App from './app';
global['lom_h'] = h
render(<App />, document.getElementById('todoapp'));
