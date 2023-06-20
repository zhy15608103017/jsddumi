import { loginHtml, styleStr } from './loginString';
export default class LoginAnimate {
    constructor() {
        let style = document.createElement('style');
        style.innerHTML = styleStr;
        this.style = style;


        const template = `<div style="background-color: #f2f2f2;position: relative;height: 100vh;width: 100vw;">${loginHtml}</div>`;
        let loginContainerNode = document.createElement('div');
        loginContainerNode.innerHTML = template;
        loginContainerNode.style.position = 'absolute';
        loginContainerNode.style.transition = 'all .5s ease-in';
        loginContainerNode.style.opacity = '1';
        this.loginContainerNode = loginContainerNode;
    }

    show() {
        const first = document.body.firstChild;
        if (first) {
            document.body.insertBefore(this.style, first);
            document.body.insertBefore(this.loginContainerNode, first);
        } else {
            document.body.append(this.style);
            document.body.append(this.loginContainerNode);
        }
    }

    hide() {
        this.loginContainerNode.style.opacity = '0';
        setTimeout(() => {
            this.style.remove();
            this.loginContainerNode.remove();
        }, 500);
    }
}
