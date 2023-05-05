/*import {FluxEcoUiCardElement} from "/components/flux-eco-ui-card-element/FluxEcoUiCardElement.mjs";
import {FluxEcoObjectProcessor} from "/components/flux-eco/FluxEcoObjectProcessor.mjs"; //todo


const cssFile = await (await fetch("/components/flux-eco-ui-card-element/style.css")).text();
const styleElement = document.createElement("style");
styleElement.textContent = cssFile

const stateProcessor = FluxEcoObjectProcessor.new({});

const cardElement = await FluxEcoUiCardElement.new(
    styleElement,
    stateProcessor,
    {
        coverImageUrl: "https://www.medi.ch/mtr/_processed_/2/d/csm_mtr_weiterbildung_35812ba1c1.jpg",
        description: "ddd",
        title: "ddd"
    }
);
document.body.appendChild(cardElement);


cardElement.subscribeToStateChanged("test", {
    onchange: (change) => {
        console.log("pong")
        console.log(change);
    }
})

setTimeout(() => {
    console.log("setImage");
    cardElement.changeState({
        coverImageUrl: "https://img.youtube.com/vi/JuI222XOgYU/maxresdefault.jpg"
    })
}, 10000);*/

/*
import {FluxEcoUiButtonElement} from "./services/flux-ui-button-element/component/FluxEcoUiButtonElement.mjs";
import {
    FluxEcoHtmlElementTreeState
} from "./services/flux-eco-js-monad/component/state/html-element-tree/FluxEcoHtmlElementTreeState.mjs";
import {
    FluxEcoUiButtonElementState
} from "./services/flux-ui-button-element/component/FluxEcoUiButtonElementState.mjs";


FluxEcoHtmlElementTreeState.emptyState().createByElementsSpecStateMorphism(
    FluxEcoUiButtonElementState.new().
)


const cssFile = await (await fetch("./services/flux-ui-button-element/component/style.css")).text();
const styleElement = document.createElement("style");
styleElement.textContent = cssFile

const path = document.createElement("path");
path.setAttribute("d", "M705.6 124.9a8 8 0 00-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0162.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0127.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 01-76.3 113.3 353.06 353.06 0 01-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 01-113.2-76.4A355.92 355.92 0 01184 650.4a355 355 0 01-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z")
const buttonElement = FluxEcoUiButtonElement.new(styleElement, {title: "test", pathElement: path})
*/

import {FluxEcoUiButtonApi} from "./services/flux-ui-button-element/component/FluxEcoUiButtonApi.mjs";

const clicked = (event) => console.log(event)

const button = FluxEcoUiButtonApi.new().create("test", "red");
button.addEventListener(button.eventNames.clicked, (event) => clicked(event))

document.body.appendChild(button);