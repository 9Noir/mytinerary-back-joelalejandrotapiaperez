import createController from "./createController.js";
import updateController from "./updateController.js";
import readController from "./readController.js";
import readOneController from "./readOneController.js";
import destroyController from "./destroyController.js";

export const create = (model) => {
    return createController(model);
};
export const update = (model) => {
    return updateController(model);
};
export const read = (model) => {
    return readController(model);
};
export const readOne = (model) => {
    return readOneController(model);
};
export const destroy = (model) => {
    return destroyController(model);
};
