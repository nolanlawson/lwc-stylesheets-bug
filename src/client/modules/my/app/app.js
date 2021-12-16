import { LightningElement, api, createElement } from 'lwc';
import Block from '../block/block';

export default class App extends LightningElement {
    @api isDynamic;
    _docRendered = false;

    constructor() {
        super();
        this.isDynamic = true;
    }

    insertDocHtml() {
        const containerEl = this.template.querySelector(".container");

        const templateEl = document.createElement('template');
        templateEl.innerHTML = '<div class="block-section"></div>';

        const blockEls = templateEl.content.querySelectorAll('.block-section');
        blockEls.forEach((blockEl) => {
            blockEl.setAttribute('lwc:dom', 'manual');
            const blockCmp = createElement('my-block', { is: Block });
            Object.assign(blockCmp, {
                dynamicBlockContent: 'Wow! This block has dynamic content!'
            });
            blockEl.innerHTML = '';
            blockEl.appendChild(blockCmp);
        });

        if (containerEl) {
            containerEl.innerHTML = "";
            containerEl.append(templateEl.content);
        }
    }

    renderedCallback() {
        if (this.isDynamic && !this._docRendered) {
            this.insertDocHtml();
            this._docRendered = true;
        }
    }
}
