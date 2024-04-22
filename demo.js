// const satu = () => {
//     return 1
// }
// const dua = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(2)
//         }, 2000)
//     })
// }
// const tiga = () => {
//     return 3
// }

// const count = () => {
//     dua().then((res)=>{
//         console.log(satu())
//         console.log(res)
//         console.log(tiga())
//     })
// }

// count()

const category = ["A","B"]

const result = category.map((cat) => `'${cat}'`).join(',')
console.log(result)

const myArr = ['favourite product']

let myObj = {
    'favourite product' : false,
    'coffee' : false,
    'non-coffee' : false
}

myObj['favourite product'] = true
console.log(myObj)

for(i in myObj){
    if(myArr.includes(i)){
        myObj = {...myObj, [i] : true}
    } else {
        myObj = {...myObj, [i] : false}
    }
}

console.log(myObj)
