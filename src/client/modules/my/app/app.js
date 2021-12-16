import { LightningElement, api, createElement } from 'lwc';
import Block from '../block/block';

export default class App extends LightningElement {
    @api isManual;
    _docRendered = false;

    constructor() {
        super();
        this.isManual = true;
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
                manualBlockContent: 'Wow! This block has manually-constructed content!'
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
        if (this.isManual && !this._docRendered) {
            this.insertDocHtml();
            this._docRendered = true;
        }
    }
}
