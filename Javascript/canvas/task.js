//loop basic

function printPattern(len) {
  for (var i = 0; i < len; i++) {
    for (var j = len - i; j > 0; j--) {
      process.stdout.write("*")

    }
    console.log("\n")

  }
}

// printPattern(4)


//object

var student = {
  name: "Manjil nepali",
  address: "ratopul",
  email: "lapzap98@gmail.com",
  interest: "gaming",
  education: [{
      name: "ABC School of Schoolery",
      date: 2000
    },
    {
      name: "BCD School of Trickery",
      date: 2006
    }
  ]
}

//  student.education.forEach(function(element,i){
//     console.log("Name:"+element.name+","+"Date:"+element.date)
//  });



//function

var fruits = [{
    id: 1,
    name: "banana",
    color: "yellow"
  },
  {
    id: 2,
    name: "apple",
    color: "red"
  }
]

function searchByName(obj, search) {
  return obj.filter(function (element) {
    return element.name.toLowerCase() == search.toLowerCase()
  })[0]

}

function searchByKey(obj, key, val) {
  return obj.filter(function (element) {
    return element[key] == val.toLowerCase();
  })[0]
}
// console.log(searchByName(fruits,'apple'));
// console.log(searchByKey(fruits,'name','apple'))



//task 3


var num = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  return collection.map(tranFunc)
}

var output = transform(num, function (num) {
  return num * 2;
});
// console.log(output)


//task 4

var arr = [{
  id: 1,
  name: 'John',
}, {
  id: 2,
  name: 'Mary',
}, {
  id: 3,
  name: 'Andrew',
}];

function sortBy(array, key) {
  var arrcpy = array.map(function (element) {
    return Object.assign({}, element)
  });
  return arrcpy.sort(function (a, b) {
    return (a[key] > b[key]) ? 1 : -1;

  });
}
var sorted = sortBy(arr, 'name');
// console.log("original array",arr)
// console.log("sorted array",sorted)


// task 5


var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [{
        id: 2,
        name: 'Sally'
      },
      {
        id: 3,
        name: 'Mark',
        children: [{
          id: 4,
          name: 'Harry'
        }]
      }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{
      id: 6,
      name: 'Peter'
    }]
  }
};


//   function normalization(obj){
//     var result = {};
//     console.log(obj)

//     for(key in input) {
//       if(typeof obj==='object'){
//         console.log("key>>"+key)
//         if(key==='children'){
//         if(obj.hasOwnProperty('children')){
//             normalization(obj[key])
//          }else{
//              console.log("true")
//             for(var subkey in obj[key]){
//                  obj[subkey]=obj[key][subkey]
//                 }
//              delete obj[key]
//               }
//     l


//      console.log("**********************")
//     }else{

//     }

//   }
//     }
// }
// normalization(input)



// function Normalize(obj) {
//     var res = {};
//     if(obj.hasOwnProperty('children')) {
//       res[obj.id] = {
//         id: obj.id,
//         name: obj.name,
//         children: []
//       }
//       var loop = {};
//       for(var i = 0; i < obj.children.length; i++) {
//         res[obj.id].children.push(obj.children[i].id);
//         Object.assign( loop, Normalize( obj.children[i] ) );
//       }
//       return Object.assign(res, loop);
//     } else {
//       return {
//         [obj.id]: { id: obj.id, name: obj.name }
//       };
//     }
//   }
//   function NormalizeInput(input) {
//     var result = {};
//     for (key in input) {
//       Object.assign(result, Normalize( input[key] ));
//     }
//     return result;
//   }
//   var result = NormalizeInput(input);
//   console.log(result);



function normalization(obj) {
  var result = {};
  console.log("****************")
  for (key in obj) {
    console.log("name:" + obj[key].name)
    if (obj[key].hasOwnProperty('children')) {

      var children = [];
      var temp = {};
      for (var i = 0; i < obj[key].children.length; i++) {
        console.log(obj[key].children[i]);
        children.push(obj[key].children[i].id);
        Object.assign(temp, normalization(obj[key].children[i]))


      }
      // delete obj[key].children;
      obj[key].children = children;
    } else {
      console.log("last")
      return {
        [obj.id]: {
          id: obj.id,
          name: obj.name
        }
      };
    }
  }
  console.log(obj)
}

normalization(input)