import { LightningElement, api } from 'lwc';

export default class Block extends LightningElement {
    @api dynamicBlockContent = "Look! It's a block!";
}
