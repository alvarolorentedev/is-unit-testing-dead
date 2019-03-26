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

# Testing Practices

--

![](resources/pyramid.png )  <!-- .element: class="plain" -->

--

![](resources/honeycomb.png )  <!-- .element: class="plain" -->

---

# Test Frameworks

--

## The classical

```ts
const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
});
```

<aside class="notes">each tests follows the AAA pattern and more than one assertion is done in each test. What makes it more difficult to understand the specific failure</aside>

--

## The Describe/It pattern 

```ts
const sum = require('./sum');

describe('adding 1 + 2 numbers', () => {
    
    let result

    beforeAll(() => {
        result = 1 + 2
    });

    it('should equal 3', () => {
        expect(result)).toBe(3)
    })
});
```
<aside class="notes">we can generate multiple levels of definitions to our tests and focus on one assertion at the time, that will allow us to know what is the exact case that makes a functionality fail</aside>

---

Inputs

--

Fakers

---

# Mock & Stubs

--

```ts
interface Extraterrestrial {
    callHome()
} 

class ET extends Extraterrestrial {
    callHome(){
        call(42)
    }
}

class Friends {
    constructor(alien: Extraterrestrial){
        super()
        this.alien = alien
    }

    letPhone(){
        this.alien.callHome()
    }
}
```

--

## Do it yourself

- simple stubs, complex spy or mock
- multiple implementations, no setup

--

## example

```ts
test('call fails because someone answers', () => {
    class mockExtraterrestrialFail extends Extraterrestrial {
        callHome(){
        }
    }
    const result = new Friend(new mockExtraterrestrialFail())
    expect(result.letPhone()).toEqual()
});

test('call fails because nobody answers', () => {
    class mockExtraterrestrialFail extends Extraterrestrial {
        callHome(){
            throw("nobody answering")
        }
    }
    const result = new Friend(new mockExtraterrestrialFail())
    expect(result.letPhone()).toThrow("nobody answering")
});
```

--

## Mocking frameworks

- integrated spy, mocks and stubs
- easy to setup
- no implementation, multiple setups

--

## example

```ts
test('call fails because someone answers', () => {
    const mock = jest.fn<Extraterrestrial>(() => {
        callHome: jest.fn()
    })
    const result = new Friend(new mock())
    expect(result.letPhone()).toEqual()
});

test('call fails because nobody answers', () => {
    const mock = jest.fn<Extraterrestrial>(() => {
        callHome: jest.fn(() => throw("nobody answering"))
    })
    const result = new Friend(new mock())
    expect(result.letPhone()).toThrow("nobody answering")
});
```

---

# The ones we didn't have before

--

## In memory databases

```ts
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();
```

---

# Docker

---

# Test Containers

---

# Mocks over the Wire