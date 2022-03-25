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






// 四、泛型
// 4.1基本使用

// // 普通类型定义
// type Dog<T> = {name: string, type: T}
// const dog: Dog<number> = {name:'ww',type:20}


// // 类定义
// class Cat<T> {
//   private type: T;
//   constructor(type: T){
//     this.type = type
//   }
// }
// const cat: Cat<number> = new Cat<number>(20)



// // 函数定义
// function swipe<T,U>(value:[T,U]):[U,T]{
//   return [value[1],value[0]]
// }
// swipe<Cat<number>,Dog<number>>([cat,dog])


// 泛型的语法格式简单总结如下：
// 类型名<泛型列表> 具体类型定义




// 4.2泛型推导与默认值
// type Dog<T> = {name:string,type:T}
// function adopt<T>(dog:Dog<T>){return dog}
// const dog = {name:'ww',type:'hsp'}
// adopt(dog)

// 若不适用函数泛型推导，我们若需要定义变量类型则必须指定泛型类型。
// const dog: Dog<string> = {name:'sss',type:'dfd'}

// 如果我们想不指定，可以使用泛型默认值的方案。
// type Dog<T = any> = {name:string,type:T}
// const dog:Dog = {name:'yy',type:'hu'}
// dog.type=123


// 泛型默认值的语法格式简单总结如下：
// 泛型名 = 默认类型




// 4.3泛型约束
// 有的时候，我们可以不用关注泛型具体的类型
// function fill<T>(length: number,value:T):T[]{
//   return new Array(length).fill(value)
// }

// 但是有时候，我们需要限定类型，这时候使用extends关键字即可
// function sum<T extends number>(value:T[]):number{
//   let count = 0;
//   value.forEach(v=>count += v);
//   return count
// }


// 泛型约束也可以用在多个泛型参数的情况
// function pick<T,U extends keyof T>(){}


// extends 的语法格式简单总结如下，注意下面的类型既可以是一般意义上的类型也可以是泛型
// 泛型名 extends 类型




// 4.4泛型条件
// 上面提到 extends，其实也可以当做一个三元运算符
// T extends U ? X : Y
// 此时返回的 T，是满足原来的 T 中包含 U 的部分，可以理解为 T 和 U 的交集。


// 所以，extends 的语法格式可以扩展为：
// 泛型名A extends 类型B ? 类型C: 类型D




// 4.5泛型推断 infer
// type Foo<T> = T extends {t:infer Test } ? Test : string;

// type One = Foo<number> // string，因为number不是一个包含t的对象类型
// type Two = Foo<{t:boolean}> // boolean，因为泛型参数匹配上了，使用了infer对应的type
// type Three = Foo<{a:number,t:()=>void}> // () => void，泛型定义是参数的子集，同样适配




// 5泛型工具
// 5.1Partical<T>

// 此工具的作用就是将泛型中全部属性变为可选的：
// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }




// 5.2Record<K, T>
// 此工具的作用是将 K 中所有属性值转化为 T 类型，我们常用它来申明一个普通 object 对象。
// type Record<K extends keyof any, T> = {
//   [key in K] :T
// }
// const obj:Record<string,string> = {name:'bh',tag:'回魔吗'}



// 5.3Pick<T, K>
// 此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
// const bird: Pick<Animal, 'name'| 'age'> = {name:'bird',age:12}





// 5.4Exclude<T, U>
// 此工具是在 T 类型中，去除 T 类型和 U 类型的交集，返回剩余的部分。
// type Exclude<T, U> = T extends U ? never : T

// type T1 = Exclude<'a'|'b'|'c','a'|'b'>  // "c"
// type T2 = Exclude<string | number|(()=>void),Function | boolean>; // string | number




// 5.5Omit<T, K>
// 此工具可认为是适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。
// 在定义中，第一步先从 T 的 key 中去掉与 K 重叠的 key，接着使用 Pick 把 T 类型和剩余的 key 组合起来即可。
// type Omit =  Pick<T, Exclude<keyof T,K>>
// const OmitAnimal:Omit<Animal,'name'|'age'> = {
//   category: 'lion', eat: () => { console.log('eat') }
// }

// 可以发现，Omit 与 Pick 得到的结果完全相反，一个是取非结果，一个取交结果。




// 5.6ReturnType<T>
// 此工具就是获取 T 类型(函数)对应的返回值类型。
// type ReturnType<T extends (...args:any) =>any> = T extends (...args:any)=> inter R? R :any

// 简化版
// type ReturnType<T extends Function> = T extends () => inter R? R :any


// function foo(x:string|number):string|number {
//   // ...
// }

// type FooType = ReturnType<foo>   //// string | number





// 5.7Required<T>
// 此工具可以将类型 T 中所有的属性变为必选项。
// type Required<T> = {
//   [P in keyof T]-?: T[P]
// }
// 这里有一个很有意思的语法-?，你可以理解为就是 TS 中把?可选属性减去的意思。











