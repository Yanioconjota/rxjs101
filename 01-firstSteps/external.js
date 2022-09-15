"use strict";
exports.__esModule = true;
exports.storeDataOnServerError = exports.storeDataOnServer = exports.name$ = void 0;
let rxjs_1 = require("rxjs");
exports.name$ = (0, rxjs_1.of)('Alice', 'Ben', 'Charlie');
function storeDataOnServer(data) {
    return new rxjs_1.Observable(function (subscriber) {
        setTimeout(function () {
            subscriber.next("Saved successfully: ".concat(data));
            subscriber.complete();
        }, 5000);
    });
}
exports.storeDataOnServer = storeDataOnServer;
function storeDataOnServerError(data) {
    return new rxjs_1.Observable(function (subscriber) {
        setTimeout(function () {
            subscriber.error(new Error('Failure!'));
        }, 5000);
    });
}
exports.storeDataOnServerError = storeDataOnServerError;
