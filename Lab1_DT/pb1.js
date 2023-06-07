// Modify the value of a text field in JavaScript using the getElementById function
document.getElementById("message").innerHTML = "Message from JavaScript";

// Display console message in JavaScript
console.log("Welcome to data transmission");

var sum = 10;
var name = "Alexandru";
var isActive = true;
var user = {id: 1, name: "Andrei", age: 21, };

var user = {
    "id": 1,
    "name" : "Alexandru Cristea",
    "username": "acristea",
    "email": "acristea@test.com",
    "address": {
        "street": "Padin",
        "number": "Ap. 10",
        "city": "Cluj-Napoca",
        "zipcode": "123456",
        "geo": {
            "lat": "46.783364",
            "lng": "23.123456"
        }
    },
    "phone": "0723 764 xxx",
    "company": {
        "name": "Company",
        "domain": "Air Traffic Management",
        "cities": ["Cluj-Napoca", "Vienna", "Paris"]
    }
}
 // Access a value from a JSON object
console.log(user.name);
console.log(user.address.geo.lat);
console.log(user.company.name);
console.log(user.company.cities[2]);

// Define and call a JavaScript function
function print(message){
    console.log(message);
}
print("hello there");

// Use the "if" instruction as a ternar operator
var password = "1234";
console.log(password == "1234" ? "Allow" : "Deny");