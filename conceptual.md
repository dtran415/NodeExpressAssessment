### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - promise
  - async/await

- What is a Promise?
  - A object that promises to resolve or fail in eventually

- What are the differences between an async function and a regular function?
  - Async functions always return a promise and allows for await function calls

- What is the difference between Node.js and Express.js?
  - Node.js is a platform that allow javascript to run on the server side. Express.js is a library that allows a server to run on Node.js.

- What is the error-first callback pattern?
  - Error-first callback pattern is when the first parameter is the error and the first thing you check for is an error before proceeding.

- What is middleware?
  - Middleware is code that runs between a server request and a route that allows common code to run for routes.

- What does the `next` function do?
  - The `next` function is the next function to be called in a chain of functions. For example, a middleware can run before a route which then calls `next` and goes to the route.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
The code will run in sequence and wait for each to finish before the next. It's better to not use await and run all the calls in parallel. Should also use a baseurl and string template to set the url.
