var list = [10,1,9,17,11,5,35, 9, 8,7,3,2];

var list_2 = [11,5,35,5,3,2,7,9,0,2,11,12,44,33,77];

function Min(list){
    var min = list[0];
    for(var i = 0; i < list.length; i++){
        if(min > list[i]){
            min=list[i];
        }
    }
    console.log(min);
    //console.log(Math.min.apply(Math,list));
}

function Max(list) {
    var max = list[0];
    for(var i=0; i < list.length;i++){
        if(max < list[i]){
            max = list[i];
        }
    }
    console.log(max);
    //console.log(Math.max.apply(Math,list));
}

function sort_asc(list) {
    for(var i = 0; i < list.length-1; i++){
        for(var j = i+1; j < list.length; j++){
            if(list[i]> list[j]){
                var tam = list[i];
                list[i] = list[j];
                list[j] = tam;
            }   
        }
    }
    console.log(list)
    //list.sort((a,b)=>{return a-b})
}

function sort_desc(list) {
    for(var i = 0; i < list.length-1; i++){
        for(var j = i+1; j < list.length; j++){
            if(list[i] < list[j]){
                var tam = list[i];
                list[i] = list[j];
                list[j] = tam;
            }   
        }
    }
    console.log(list)
    //list.sort((a,b)=>{return b-a})
}

function get_elements_same_two_array(list1,list2) {
    var object = {};
    var result = {};
    list1.forEach(value => {
        object[value] = 1;
    });
    list2.forEach(value=>{
        if(object[value] === 1) result[value] = 1;
    })
    console.log (Object.keys(result));
    //console.log(list1.filter(value => list2.includes(value)))
}

function get_elements_different_two_array(list1,list2) {
    var start_time = new Date().getTime();
    var object = {}; var object2 = {};
    var result1 = []; const result2 = [];

    //BEGIN CACH 1
    list1.forEach(value => {
        object[value] =1;
    });
    list2.forEach(value=>{
        if(object[value]) {
            delete object[value];
        } else {
            object[value] = 1;
        }
    })
    console.log(Object.keys(object).length);
    //END CACH 1

    
    //BEGIN CACH 2
    // var res1 =[];var res2 =[];
    // list1.forEach(value => {
    //     object[value] =1;
    // });
    // list2.forEach(value=>{
    //     if(object[value] !== 1) res1.push(value);
    // })

    // list2.forEach(value => {
    //     object2[value] =1;
    // });
    // list1.forEach(value=>{
    //     if(object2[value] !== 1) res2.push(value);
    // })
    // console.log(res1.concat(res2).length);
    //END CACH 2

    //BEGIN CACH 3
    // console.log((list1.filter(value => !list2.includes(value))).concat((list2.filter((value) => !list1.includes(value)))).length);
    //END CACH 3
    console.log('get_elements_different_two_array tong thoi gian chay', new Date().getTime() - start_time);
}

function check(arr,search){
    for(var i of arr){
        if(search === i) return true;
    }
     return false;

}

console.log(check([1,2,3,4,5],6));

function sortByLength (array) {
    for(var i = 0; i < array.length; i++){

    }
    return (array.sort((a,b)=> { return a.length -b.length}))
};

function F(n){
    if(n == 0) return 1;
    if(n == 1) return 1;
    if(n >= 2) return F(n-1)+F(n-2);
}

function random(minimum,maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


var list1 = [];
var list2 = [];
for(var i = 0; i < 100000;i++) {
    list1.push(random(10000,100000));
    list2.push(random(10000,100000));
}
//console.log(F(3))
// get_elements_same_two_array([10,1,9,17,11,5,35, 9, 8,7,3,2],[11,5,35,5,3,2,7,9,0,2,11,12,44,33,77])
// get_elements_different_two_array(list1,list2);
// Min([0,1,9,17,11,5,35, 9, 8,7,3,2]);
// Max([0,1,9,17,11,5,35, 9, 8,7,3,2]);
// sort_asc([0,1,9,17,11,5,35, 9, 8,7,3,2]);
// sort_desc([0,1,9,17,11,5,35, 9, 8,7,3,2]);
// sortByLength(["Beg", "Life", "I", "To"]);