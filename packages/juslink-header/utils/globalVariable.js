var fn = function (state) {
    var executeState = state;

    return {
        setData: function (data) {
            executeState = data;
        },
        getData: function () {
            return executeState;
        },
    };
};

var executeState = false;

var executeStateFN = fn(executeState);

module.exports = executeStateFN;
