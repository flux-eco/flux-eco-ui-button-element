export class FluxEcoUiButtonElement extends HTMLElement {
    static get tagName() {
        return 'flux-eco-ui-button-element'
    }

    /**
     * @typedef {object} FluxEcoUiButtonElementEventNames
     * @property {string} clicked
     */
    #eventNames;

    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {HTMLElement} rootElement
     */
    constructor(
        rootElement
    ) {
        super();
        /**
         * @type {FluxEcoUiButtonElementEventNames}
         */
        this.#eventNames = {
            clicked: [FluxEcoUiButtonElement.tagName, "clicked"].join("-")
        }
        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#shadow.appendChild(rootElement);

        //todo
        const styleSheet =  new CSSStyleSheet();
        styleSheet.insertRule(".button { color: white }", 0);


        this.#shadow.adoptedStyleSheets = [styleSheet];
    }

    /**
     * @param {HTMLElement} rootElement
     */
    static new(
        rootElement
    ) {
        return new this(
            rootElement
        )
    }

    /**
     * @return {FluxEcoUiButtonElementEventNames}
     */
    get eventNames() {
        return this.#eventNames;
    }

    connectedCallback() {
    }

//type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions

}

customElements.define(FluxEcoUiButtonElement.tagName, FluxEcoUiButtonElement);