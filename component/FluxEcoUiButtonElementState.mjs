import {FluxEcoJsStateMonad} from "../../flux-eco-js-monad/component/state/FluxEcoJsStateMonad.mjs";

export class FluxEcoUiButtonElementState {

    /**
     * @type {object} FluxEcoUiButtonElementStateNames
     * @property {string} initialized
     * @property {string} setCssProperties
     * @property {string} defined
     */
    #stateNames;

    /**
     * @typedef {object} FluxEcoUiButtonElementStateData
     * @property {Object<string,FluxEcoHtmlElementData>} elements
     * @property {FluxEcoHtmlElementData} elements.root
     * @property {FluxEcoHtmlElementData} elements.button
     */
    #initData;

    constructor() {
        this.#stateNames = {
            initialized: "initialized",
            setLabel: "setLabel",
            setCssProperties: "setCssProperties",
            defined: "defined"
        };
        this.#initData = {
            elements: {
                style: `.button: {
                        backgroundColor: var(--bg-color);
                    }`,
                root: {
                    name: "root",
                    tagName: "div",
                    childElementsName: [
                        "button"
                    ]
                },
                button: {
                    name: "button",
                    tagName: "button",
                    attributeValues: {
                        class: "button"
                    },
                    innerText: {},
                    childElementsName: [
                        "svg"
                    ]
                },
                svg: {
                    name: "svg",
                    tagName: "svg",
                    attributeValues: {
                        viewBox: "64 64 896 896",
                        focusable: "false",
                        width: "1em",
                        height: "1em",
                        fill: "currentColor",
                    },
                    styleValues: {},
                    childElementsName: []
                }
            },
        };
    }

    /**
     * @return {FluxEcoUiButtonElementState}
     */
    static new() {
        return new this();
    }

    /**
     * @param {{label:string}} attributes
     * @param {{backgroundColor: string}} cssProperties
     * @return {FluxEcoUiButtonElementStateValues}
     */
    define(attributes, cssProperties) {
        /**
         * @typedef {FluxEcoStateValues} FluxEcoUiButtonElementStateValues
         * @property {FluxEcoUiButtonElementStateData} data
         */
        const stateValues = {
            currentStateName: this.#stateNames.initialized,
            nextStateName: this.#stateNames.setCssProperties,
            completedStateNames: [this.#stateNames.initialized],
            uncompletedStateNames: [
                this.#stateNames.setCssProperties,
                this.#stateNames.defined
            ],
            finalStateName: this.#stateNames.defined,
            data: this.#initData
        }

        return FluxEcoJsStateMonad.of(stateValues)
            .bind((stateValues) => this.#setCssProperties(stateValues, cssProperties.backgroundColor))
            .bind((stateValues) => this.#setLabel(stateValues, attributes.label))
            .bind((stateValues) => [FluxEcoJsStateMonad.markStateAsCompleted(stateValues, this.#stateNames.defined), null]).stateValues
    }

    /**
     * @param {FluxEcoUiButtonElementStateValues} stateValues
     * @param {string} label
     */
    #setLabel(stateValues, label) {
        /**
         * @type {FluxEcoUiButtonElementStateValues}
         */
        const currentStateValues = FluxEcoJsStateMonad.changeCurrentStateName(stateValues, this.#stateNames.setLabel);
        const data = currentStateValues.data
        data.elements.button.innerText = label;
        const changedStateValues = FluxEcoJsStateMonad.setStateData(currentStateValues, data);
        return [FluxEcoJsStateMonad.markStateAsCompleted(changedStateValues, this.#stateNames.setLabel), null]
    }

    /**
     * @param {FluxEcoUiButtonElementStateValues} stateValues
     * @param {string} backgroundColor
     * @return  {[{FluxEcoStateValues}, (() => array) | null]}
     */
    #setCssProperties(stateValues, backgroundColor) {
        /**
         * @type {FluxEcoUiButtonElementStateValues}
         */
        const currentStateValues = FluxEcoJsStateMonad.changeCurrentStateName(stateValues, this.#stateNames.setCssProperties);
        const data = currentStateValues.data
        //data.elements.button.styleValues.backgroundColor = backgroundColor;

        //todo set css Properties
        //

        const changedStateValues = FluxEcoJsStateMonad.setStateData(currentStateValues, data);
        return [FluxEcoJsStateMonad.markStateAsCompleted(changedStateValues, this.#stateNames.setCssProperties), null]
    }
}