// Add a decrement button and restrict to [0, 10]
var counter = 0;
function printValue(divId, value) {
    document.getElementById(divId).innerHTML = value;
}
printValue("counter", 0);

document.getElementById("inc").addEventListener("click", increment);


function increment() {
    counter++;
    if(counter > 10) 
    counter--;
    printValue("counter", counter);

}

document.getElementById("dec").addEventListener("click", decrement);

function decrement() {
    counter--;
    if(counter < 0)
    counter++;
    printValue("counter", counter);
}