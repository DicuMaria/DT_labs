// Use the jQuery library in the JavaScript app
var counter = 0;
function printValue(divId, value) {
    $('#' + divId).html(value);
}
printValue("counter", 0);

$("#inc").on("click", increment);

function increment() {
    counter++;
    printValue("counter", counter);
}