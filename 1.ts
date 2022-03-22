// 一、 类型

// 1.1 unknown
// const num: number = 10
// ;(num as unknown as string).split('')

// function test(input:unknown):number{
//   if(Array.isArray(input)){
//     return input.length // Pass: 这个代码块中，类型守卫已经将input识别为array类型
//   }
//   return input.length // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
// }


// 1.2 void

// function warnUser(): void {
//   // alert("This is my warning message");
//   return
// }


// 1.3 never
// 这两个单独的字符串类型并不可能相交，故human为never类型
// type human = 'boy' & 'girl' 

// 不过任何类型联合上 never 类型，还是原来的类型。
// type language = 'ts' | never
// const a:language = 'ts'

// 无法把其他类型赋给 never。
// let n:never
// let o:any = {}
// n=o





// 二、运算符

// 2.1非空断言运算符 !
// 这个运算符可以用在变量名或者函数名之后，用来强调对应的元素是非 null|undefined 的
// function onClick(callback?:()=>void){
//   callback!()
// }


// 2.2可选链运算符 ?.
// 相比上面!作用于编译阶段的非空判断，?.这个是开发者最需要的运行时(当然编译时也有效)的非空判断
// obj?.prop


// 2.3空值合并运算符 ??
// ??与||的功能是相似的，区别在于??在左侧表达式结果为 null 或者 undefined 时，才会返回右侧表达式。
// let b = a ?? 10



// 2.4数字分隔符_
// _可以用来对长数字做任意的分隔，主要设计是为了便于数字的阅读，编译出来的代码是没有下划线的，请放心食用。
// let num:number = 1_123456_456.12_123









// 三、操作符
// 3.1键值获取 keyof
// keyof 可以获取一个类型所有键值，返回一个联合类型
// type Person = {
//   name:string;
//   age:number;
// }
// type PersonKey = keyof Person  // PersonKey得到的类型为 'name' | 'age'


// // keyof 的一个典型用途是限制访问对象的 key 合法化，因为 any 做索引是不被接受的。
// function getValue(p:Person,k:keyof Person){
//   return p[k];  // 如果k不如此定义，则无法以p[k]的代码格式通过编译
// }


// 总结起来 keyof 的语法格式如下：
// 类型 = keyof 类型




// 3.2 实例类型获取 typeof
// typeof 是获取一个对象/实例的类型
// const me = {name:'gzx',age:16}
// type P = typeof me   //{ name: string; age: number; }

// ypeof 可以和 keyof 一起使用(因为 typeof 是返回一个类型嘛)，如下：
// type PersonKey = keyof typeof me 

// 总结起来 typeof 的语法格式如下：
// 类型 = typeof 实例对象




// 3.3遍历属性 in
// in 只能用在类型的定义中，可以对枚举类型进行遍历，如下：
// type TypeToNumber<T> = {
//   [key in keyof T]: number
// }

// 总结起来 in 的语法格式如下：
// [ 自定义变量名 in 枚举类型 ]: 类型

















