import { App } from './App';

const init = () => {
    new App();
}

if (document.readyState === 'complete') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}