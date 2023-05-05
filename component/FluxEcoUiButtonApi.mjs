import {FluxEcoUiButtonElementState} from "./FluxEcoUiButtonElementState.mjs";
import {FluxEcoUiButtonElement} from "./FluxEcoUiButtonElement.mjs";

export class FluxEcoUiButtonApi {
    constructor() {

    }

    /**
     * @return {FluxEcoUiButtonApi}
     */
    static new() {
        return new this();
    }

    /**
     * @return {FluxEcoUiButtonElement}
     */
    create(title, backgroundcolor) {
        const stateValues = FluxEcoUiButtonElementState.new().define({label: title}, {backgroundcolor: backgroundcolor});
        const rootElement = this.#createElement(stateValues.data.elements.root, stateValues.data.elements);


        //const style = document.createElement("style");
        /*Object.entries(elementData.styleValues).forEach(([styleName, styleValue]) => {
            element.setAttribute(attributeName, attributeValue);
        })*/
        //rootElement.appendChild(style);

        //todo should the registration of an event like "click" be part of state?
        const element = FluxEcoUiButtonElement.new(rootElement);
        element.addEventListener('click', () => {
            element.dispatchEvent(new CustomEvent(element.eventNames.clicked, {detail: stateValues}));
        });
        return element;
    }


    createSvgButton(title, backgroundcolor, svgPath, onClick) { //???
        const stateValues = FluxEcoUiButtonElementState.new().define({});
        const rootElement = this.#createElement(stateValues.data.elements.root, stateValues.data.elements);




        return FluxEcoUiButtonElement.new(rootElement);
    }

    /**
     * @param {FluxEcoHtmlElementData} elementData
     * @param {Object<FluxEcoHtmlElementData>} elements
     * @return {HTMLElement}
     */
    #createElement(elementData, elements) {
        const element = document.createElement(elementData.tagName);
        element.name = elementData.name;

        if (elementData.hasOwnProperty("attributeValues") === true) {
            Object.entries(elementData.attributeValues).forEach(([attributeName, attributeValue]) => {
                element.setAttribute(attributeName, attributeValue);
            })
        }

        if (elementData.hasOwnProperty("innerText") === true) {
            element.innerText = elementData.innerText
        }

        if (elementData.childElementsName.length > 0) {
            elementData.childElementsName.forEach((childElementName) => {
                element.appendChild(this.#createElement(elements[childElementName], elements));
            });
        }
        return element;
    }
}