---
theme : "night"
transition: "zoom"
highlightTheme: "darkula"
embedded: true
---

## is unit testing dead?

<small>Created by [Alvaro](http://kanekotic.xom) / [@kanekotic](http://twitter.com/kanekotic)</small>


---

### what is unit testing?

_In computer programming, unit testing is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures, are tested to determine whether they are fit for use._
<!-- .element: class="fragment fade-in plain" -->

---

### how do we think unit testing to look like?

![](resources/pyramid.png )  <!-- .element: class="fragment fade-in plain" -->

---

## Test Definitions

--

### The classical

```ts
const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
});
```
   <!-- .element style="font-size:0.5em;"-->

<aside class="notes">each tests follows the AAA pattern and more than one assertion is done in each test. What makes it more difficult to understand the specific failure</aside>

--

### The Describe/It pattern 

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
 <!-- .element style="font-size:0.5em;"-->
<aside class="notes">we can generate multiple levels of definitions to our tests and focus on one assertion at the time, that will allow us to know what is the exact case that makes a functionality fail</aside>

---

# Inputs

--

### Your brain power

```ts
const sum = require('./sum')

test('1 plus 2 should equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('2 plus 2 should equal 4', () => {
    expect(sum(2, 2)).toBe(4)
})
```
<!-- .element style="font-size:0.5em;"-->
<aside class="notes">
Exactly what you want and expect</aside>

--

### Fakers

```ts
const sum = require('./sum')
const faker = require('fakers')

test('should be the sum of numbers', () => {
    const n1 = faker.random.number()
    const n2 = faker.random.number()
    expect(sum(n1, n2)).toBe(n1+n2)
})
```
<!-- .element style="font-size:0.5em;"-->
<aside class="notes">
Not what you want but what you expect</aside>

---

# Mock & Stubs

--

### example

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
<!-- .element style="font-size:0.4em;"-->
<aside class="notes"></aside>

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
<!-- .element style="font-size:0.4em;"-->
<aside class="notes"></aside>

--

## Mocking frameworks

- integrated spy, mocks and stubs
- easy to setup
- no implementation, multiple setups

--

```ts

describe("et", () => {
  let mockAlien: any;

  beforeAll(async () => {
    mockAlien = jest.fn(() => ({
      callHome: jest.fn()
    }))();
  });

  it("call fails because someone answers", () => {
    const result = new Friend(mockAlien);
    expect(result.letPhone()).toEqual(undefined);
  });

  it("call fails because nobody answers", () => {
    mockAlien.callHome.mockImplementation(() => {
      throw "nobody answering";
    });
    const result = new Friend(mockAlien);
    try {
      result.letPhone()
    } catch (error) {
      expect(error).toEqual("nobody answering");
    }
  });
});
```
<!-- .element style="font-size:0.4em;"-->
<aside class="notes"></aside>

---

## In memory databases

```ts  
describe("in memory db", () => {
  let db: any;

  beforeAll(async () => {
    db = new sqlite3.Database(":memory:");
    await new Promise((resolve, reject) =>
      db.run("CREATE TABLE lorem (info TEXT)", () => resolve())
    );
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    await new Promise((resolve, reject) => stmt.finalize(() => resolve()));
  });

  afterAll(async () => {
    db.close();
  });

  it(`should return exisiting user`, async () => {
    await new Promise((resolve, reject) =>
      db.each(
        "SELECT rowid AS id, info FROM lorem where id = 1",
        function(_: any, row: any) {
          expect(row.info).toEqual("Ipsum 0");
        },
        () => resolve()
      )
    );
  });
});

``` 
<!-- .slide: font-size="0.15em" -->

---

# Docker

---

# Testcontainers

--

```ts
describe("DAL", () => {
  let container
  let redisClient
  
  beforeAll( async () => {
    container = await new GenericContainer("redis","alpine")
    .withEnv("KEY", "VALUE")
    .withExposedPorts(6379)
    .start();
    redisClient = redis.createClient(`redis://localhost:${container.getMappedPort(6379)}`);
    await redisClient.set("pepe", "is awesome");
  });

  afterAll( async () => {
    await redisClient.quit();
    await container.stop();
  });

  it(`should return exisiting user`, async () => {
    const dal = new DAL()
    await dal.connect(`redis://localhost:${container.getMappedPort(6379)}`)
    const result = await dal.getUser("pepe")
    expect(result).toEqual("is awesome")
  });
});
```
<!-- .element: width="178" height="238" -->

--

<pre><code class="hljs" data-line-numbers="4,8-11">
import React, { useState } from 'react';
 
function Example() {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
</code></pre>

---

# Test doubles

--

## Mountebank   

---

## How testing will look like?

![](resources/honeycomb.png )   <!-- .element: class="fragment fade-in plain" -->

