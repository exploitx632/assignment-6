1.What is the difference between var, let, and const?
  ans: using var  can redeclare same variable , can value change and var is a function scope ,
      using let  can't redeclare same variable but can reassign value and let is a block scope ,
      using const  can't redeclare same variable and can't reassign value,
      object/array value can change but can't change entire object/array and const is block scope.

2. What is the difference between map(), forEach(), and filter()?
   ans: map method take an array do some work with array element and  return an new  array  ,
   forEach method take an array can do some work with array value but don't return anything
    and filter method condition wise take macthing element from array and give us a new array .

4. What are arrow functions in ES6?
   ans: arrow function is declare like variable and short way to declare a function .
   no need return keyword for one line arrow function to return value

   
6. How does destructuring assignment work in ES6?
   ans: Distructuring is a feature where we can extract array/object value to another variable easily .
    for array we extract value by position and for object we extract value by key/properties

7. Explain template literals in ES6. How are they different from string concatenation?
   ans: Template literals(``) is the technique to write multiline string where we can use the value of ${variable/array/object}  etc.
   differense is inside normal string we can't access value of variable/array/object.
   for concatenation we usr (+) but inside Template literals we can inject multiple variable/expressions easily.
