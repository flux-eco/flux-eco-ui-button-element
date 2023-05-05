export class FluxEcoJsStateMonad {
    /**
     * @property {object}
     */
    #stateValues;

    /**
     * @param {object} stateValues
     */
    constructor(stateValues) {
        this.#stateValues = stateValues;
    }

    /**
     * @typedef {object} FluxEcoStateValues
     * @property {string} currentStateName
     * @property {string} nextStateName
     * @property {string} finalStateName
     * @property {array} completedStateNames
     * @property {array} uncompletedStateNames
     * @property {Object} data
     *
     * @param {FluxEcoStateValues} stateValues
     */
    static of(stateValues) {
        return new this(stateValues);
    }

    /**
     * @return {FluxEcoStateValues}
     */
    get stateValues() {
        return this.#stateValues;
    }

    bind(fn) {
        const [newState, newFn] = fn(this.#stateValues);
        if (newFn === null) {
            //final transition of chain
            return FluxEcoJsStateMonad.of(newState);
        }
        if (newFn && typeof newFn !== "function") {
            throw new TypeError("Invalid function provided.");
        }

        return FluxEcoJsStateMonad.of(newState).bind(newFn);
    }


    /**
     * todo think about the static - but in functional thinking it could/should be ok.
     * it should work non static by returning the FluxEcoJsStateMonad with the new state.
     *
     * bind(fn, stateName) ?
     */

    /**
     * @param {FluxEcoStateValues} stateValues
     * @param {string} stateName
     * @return {FluxEcoStateValues}
     */
    static markStateAsCompleted(stateValues, stateName) {
        if (stateValues.currentStateName !== stateName) {
            console.log("the current stateName differs from the initalized steps: current stateValues: " + JSON.stringify(stateValues) + " try to mark as completed: " + stateName) //todo
        }

        let index = stateValues.completedStateNames.indexOf(stateName);
        if (index !== -1) {
            stateValues.uncompletedStateNames.splice(index, 1);
            stateValues.completedStateNames.push(stateName)
            stateValues.nextStateName = stateValues.uncompletedStateNames[0];
        }

        return stateValues;
    }

    static putStateNameAsNextInFront(stateValues, stateName) {
        if (stateValues.uncompletedStateNames.includes(stateName) === false) {
            stateValues.uncompletedStateNames.unshift(stateName);
        }
        stateValues.nextStateName = stateName;

        return stateValues;
    }

    /**
     * @param {FluxEcoStateValues} stateValues
     * @param {string} currentStateName
     * @return {FluxEcoStateValues}
     */
    static changeCurrentStateName(stateValues, currentStateName) {
        if (stateValues.nextStateName !== currentStateName && stateValues.currentStateName !== currentStateName) {
            console.log("the current transition stateName differs from the initalized transition steps " + stateValues.nextStateName + currentStateName) //todo
        }
        stateValues.currentStateName = currentStateName;
        stateValues.nextStateName = stateValues.uncompletedStateNames[1];

        return stateValues;
    }

    /**
     * @param {FluxEcoStateValues} stateValues
     * @param {object} data
     * @return {FluxEcoStateValues}
     */
    static setStateData(stateValues, data) {
        stateValues = {...stateValues};
        stateValues.data = {...data};
        return stateValues;
    }
}