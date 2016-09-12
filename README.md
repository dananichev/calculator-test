# Basic Calculator
First of all, it's just a test task an nothing more.
Secondly, 
## Small description
Due to implementation of JS engine (according to IEEE 754) there are some issues related to rounding of math operations and float numbers.
Current version of calculator does not support big numbers and edge cases (such as 0.1 + 0.2). 
Both of this issues can be handled but there were no requirements about this in the description of task.
If needed, it can be improved.

Due to ``Object.assign()`` usage it wont work in, at least, IE12-.
Due to ``KeyboardEvent.key`` usage it wont work in, at least, current Safari version.
Both of this issues can be resolved if needed. 

Basic pluggable system implemented to support extending of operations supported by calculator (check ``registerOperation`` method in ``calc.js`` + any existing operation for examples).
