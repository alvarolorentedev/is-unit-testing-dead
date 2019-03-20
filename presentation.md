---
theme : "night"
transition: "zoom"
highlightTheme: "darkula"
---

# Is developer testing old?

#### Are testing practices stalled

<small>Created by [Alvaro](http://kanekotic.xom) / [@kanekotic](http://twitter.com/kanekotic)</small>

---

# History 

--

<!-- .slide: data-background="./resources/50s.jpg" -->

 # till 1956

<aside class="notes">Until 1956 it was the debugging oriented period, where testing was often associated to debugging: there was no clear difference between testing and debugging.</aside>

--

<!-- .slide: data-background="./resources/60s.jpg" -->

 # 1957-1978

<aside class="notes">From 1957-1978 there was the demonstration oriented period where debugging and testing was distinguished now - in this period it was shown, that software satisfies the requirements.
</aside>

--

<!-- .slide: data-background="./resources/70s.jpg" -->

 # 1979-1982

<aside class="notes">The time between 1979-1982 is announced as the destruction oriented period, where the goal was to find errors.</aside>

--

<!-- .slide: data-background="./resources/80s.jpg" -->

 # 1983-1987

<aside class="notes">1983-1987 is classified as the evaluation oriented period: intention here is that during the software lifecycle a product evaluation is provided and measuring quality.</aside>

--

<!-- .slide: data-background="./resources/00s.png" -->

 # 1988-Now

<aside class="notes">From 1988 on it was seen as prevention oriented period where tests were to demonstrate that software satisfies its specification, to detect faults and to prevent faults.</aside>

---

# Testing Pyramid

--

![](resources/pyramid.png )  <!-- .element: class="plain" -->

---

# Test Frameworks

--

## The classical

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

<aside class="notes">each tests follows the AAA pattern and more than one assertion is done in each test. What makes it more difficult to understand the specific failure</aside>

--

## The Describe/It pattern 

```js
const sum = require('./sum');

describe('adding 1 + 2 numbers', () => {
    
    let result

    beforeAll(() => {
        result =  1+2;
    });

    it('should equal 3', () => {
        expect(result)).toBe(3);
    })
});
```
<aside class="notes">we can generate multiple levels of definitions to our tests and focus on one assertion at the time, that will allow us to know what is the exact case that makes a functionality fail</aside>

---

# Mocking

---

# In memory databases

---

# Docker

---

# Test Containers

---

# Mocks over the Whire