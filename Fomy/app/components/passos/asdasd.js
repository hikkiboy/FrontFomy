var Receitas = [1,2,3,4,5,6]


var i = 0
let passed = false
const x = () => {
  do {
    i++
    // setPasso(Receitas[i])
    passed = true
    console.log(i)
  }while (i < Receitas.length && passed == false)
  passed == false
  console.log(i)
}
