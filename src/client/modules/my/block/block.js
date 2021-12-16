import { LightningElement, api } from 'lwc';

export default class Block extends LightningElement {
    @api manualBlockContent = "Look! It's a block!";
}
