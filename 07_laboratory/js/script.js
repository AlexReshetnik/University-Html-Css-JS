
function triangle(value1, params1, value2, params2, ...params) {
    if (value1 == undefined || params1 == undefined || value2 == undefined || params2 == undefined || params.length != 0) {
        console.log("Дивна кількість аргументів, повино бути 4! У вас :" + (4 + params.length));
        console.log(arguments);
        return
    }

    let a, b, c, alpha, beta

    if (params1 == "leg") {
        a = value1
    } else if (params2 == "leg") { a = value2 }

    if (params1 == params2 & params2 == "leg") {
        a = value1
        b = value2
    }

    if (!parameters.find((i) => i == params1)) {
        console.log("Аргумент " + params1 + " незрозумілий! Перечитайте документацію :");
        console.log(instruction);
        return "failed"
    }
    if (!parameters.find((i) => i == params2)) {
        console.log("Аргумент " + params2 + " незрозумілий! Перечитайте документацію :");
        console.log(instruction);
        return"failed"
    }
    if (value1 <= 0) {
        console.log("Значення " + value1 + " некоректне!");
        return"failed"
    }
    if (value2 <= 0) {
        console.log("Значення " + value2 + " некоректне!");
        return"failed"
    }


    let trig = {}
    trig[params1] = value1
    trig[params2] = value2

    if (params1 == params2 && params2 != "leg" ||
        trig["adjacent angle"] && trig["opposite angle"] ||
        trig["angle"] && trig["leg"] ||
        trig["adjacent angle"] && trig["angle"] ||
        trig["angle"] && trig["opposite angle"]) {
        console.log("Дана коомбінація вхідних агрументів неможлива!");
        return"failed"
    }

    c = trig["hypotenuse"]

    if (trig["adjacent angle"]) {
        if (a) {
            beta = trig["adjacent angle"]
        } else  {
            alpha = trig["adjacent angle"]
        } 
    }
    if (trig["opposite angle"]) {
        if (a) {
            alpha = trig["opposite angle"]
        } else {
            beta = trig["opposite angle"]
        } 
    }

    if (trig["angle"] && c) alpha = trig["angle"]
    

    if (alpha != undefined && (alpha < 0 || alpha > 90)) {
        console.log("Значення " + alpha + " некоректне!");
        return"failed"
    }
    if (beta != undefined && (beta < 0 || beta > 90)) {
        console.log("Значення " + beta + " некоректне!");
        return"failed"
    }
    if (a >= c || b >= c) {
        console.log("Катет не може бути більшим за гіпотенузу");
        return"failed"
    }
    if (a && b) Two_legs();
    else if (a && c) b = Leg_hypotenuse(c, a)
    else if (b && c) a = Leg_hypotenuse(c, b)
    else if (alpha && c) beta = Hypotenuse_acute_angle(alpha)
    else if (beta && c) alpha = Hypotenuse_acute_angle(beta)
    else if (alpha && a) [beta, b] = Leg_angle(alpha, a, Math.sin)
    else if (alpha && b) [beta, a] = Leg_angle(alpha, b, Math.sin)
    else if (beta && a) [alpha, b] = Leg_angle(beta, a, Math.cos)
    else if (beta && b) [alpha, a] = Leg_angle(beta, b, Math.cos)
    else console.log("Чо-то пішло не по плану!!!");



    function Two_legs() {//Два катети
        c = (a ** 2 + b ** 2) ** 0.5
        alpha_beta(a, b)
    }
    function Leg_hypotenuse(cc, ab) {//Катет і гіпотенуза
        let res = (cc ** 2 - ab ** 2) ** 0.5
        alpha_beta(ab, res)
        return res
    }
    function alpha_beta(a, b) {
        alpha = toGR(Math.atan(a / b))
        beta = toGR(Math.atan(b / a))
    }
    function Leg_angle(degrees, leg, callback) {//Катет і прилеглийа або протилежний гострий кут
        c = leg / callback(toRD(degrees))
        return [90 - degrees, (c ** 2 - leg ** 2) ** 0.5]
    }
    function Hypotenuse_acute_angle(degrees) {//Гіпотенуза і гострий кут
        a = c * Math.sin(toRD(degrees))
        b = c * Math.sin(toRD(90 - degrees))
        return 90 - degrees
    }
    function toGR(rad) {
        return (rad * 180) / Math.PI
    }
    function toRD(gr) {
        return (gr * Math.PI) / 180
    }

    console.log("a = " + a.toFixed(2));
    console.log("b = " + b.toFixed(2));
    console.log("c = " + c.toFixed(2));
    console.log("alpha = " + alpha.toFixed(2));
    console.log("beta = " + beta.toFixed(2));
    console.log("");
    return "success"
   
}
let parameters = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"]
let instruction = `
Інструкція з використання 
    Позначення      Що позначає
 leg              катет
 hypotenuse       гіпотенуза
 adjacent angle   прилеглий до катета кут
 opposite angle   протилежний до катета кут
 angle            один з двох гострих кутів (коли задана гіпотенуза)

`
console.log(instruction);


triangle(18, "hypotenuse",7, "opposite angle");
triangle(7, "leg", 18, "hypotenuse");
triangle(4, "leg", 5, "leg");
triangle(5, "leg" , 60, "adjacent angle");
triangle(4, "leg", 5, "leg");
triangle(4, "hypotenuse", 3, "leg");
triangle(4, "leg", 5, "hypotenuse");
triangle(5, "leg" , 60, "adjacent angle");
//triangle(5, "leg" , 60, "adjacent angle");
//triangle(5, "leg" , 10, "opposite angle");
//triangle(5, "leg" , 60, "opposite angle");
//triangle( 60, "opposite angle",5, "leg");
//triangle(7, "adjacent angle",18, "hypotenuse");

//triangle(7, "leg",18, "hypotenuse");
//triangle(20, "opposite angle",20, "leg");
//triangle(43.13, "adjacent angle",-2, "hypotenuse");