# Basic Calculator
It's just a test task and nothing more.

## Requirements
Create a calculator app without using any third-party libraries. The calculator should be capable of performing addition, subtraction, multiplication, division and exponentiation. It should be usable via mouse and keyboard. Explain on which aspects (choose three) you intend to focus on (e.g. design, maintainability, etc.) and briefly explain why you chose each.

## Possible improvements
Due to implementation of JS engine (according to IEEE 754) there are some issues related to rounding of math operations and float numbers.
Current version of calculator does not support big numbers and edge cases (such as 0.1 + 0.2). 
Both of this issues can be handled.
If needed, it can be improved.

Due to ``Object.assign()`` usage it wont work in, at least, IE12-.
Due to ``KeyboardEvent.key`` usage it wont work in, at least, current Safari version.
Both of this issues can be resolved if needed. 

Basic pluggable system implemented to support extending of operations supported by calculator (check ``registerOperation`` method in ``calc.js`` + any existing operation for examples).
