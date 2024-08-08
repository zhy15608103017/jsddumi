export default function initBaseStyle(){
    const style = document.createElement('style');
    style.textContent = `
    ::selection {
        background-color: var(--jusda-primary-color) !important;
        color: white !important;
    }
    
    ::-moz-selection {
        background:var(--jusda-primary-color) !important;
        color:white !important;
    }
    
    ::-webkit-selection {
        background:var(--jusda-primary-color) !important;
        color:white !important;
    }
    `;
    document.head.appendChild(style);
}