var lang=[
    "php","C","C++","js","python","go","ruby","java",
    "php","C","C++","js","python","go","ruby","java",
    "php","C","C++","js","dart","go","ruby","java",
]

//task 1
// var uniqueArray= new Set(lang)
// console.log(uniqueArray)
function getUnique(){

    var uniqueArray=[];
    for(var i=0;i<lang.length;i++){
        if(uniqueArray.indexOf(lang[i])==-1){
            uniqueArray.push(lang[i])
        }
    }
    
    return uniqueArray;

}

// console.log(getUnique());
//task 2

function getCount(){
   var unique=getUnique();
  
   var result={};
   unique.forEach((element,i)=>{
    var count=0;
      lang.forEach((element2)=>{
       
        if(element==element2){
           
            count++;
        }
       
    });
    result[unique[i]]=count;
   })
   return result;
      
   
}

// console.log(getCount())


//callback

