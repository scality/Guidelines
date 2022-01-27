# Contributing to the Project

This document contains and defines the rules that have to be followed by any
contributor to the project, in order for any change to be merged into the
stable branches.

## Workflow

The worklow we define here has multiple purposes, and this document will go
over what rule is here to ensure each of these purposes:

* Define one and only one path to add code into the codebase
* Allow the maintenance of multiple releases at the same time
* Work efficiently as a team
* Streamline all the development in one rolling-release branch

First, have a cookie, and look at this magnificient ASCII workflow
representation. It should help you identify how contributions are made, where
and what does the code pass through, and how we maintain releases.

```ascii
   WIP Branches         master        Release Branches
                   |      |
                   |      |
                   |      X
          dev/FT/color  / |
        +<---<----<---<+  |
        |          |      |
        |          +>->+  |
        X               \ |
        |                 X
        X  dev/BF/flow  / |
    +<--|-<---<---<---<+  |
    |   X                 |
    X   |  Pull Request   |
    |   +>---->---->-->+  |
    X  code review + CI \ |
    |     -> merge PR     X
    |                     | \   stable/1.0
    X                     |  +>--->--->--->+
    |    Pull Request     |                |
    +>--->---->--->--->+  |                |
      code review + CI  \ |                |
                          X>--->---->-->-->X # Bump version to 1.0.1
                          | cherry-pick -x |
                          |                |
                          |                |
                          v                v
```

As you can see, we have three main types of branches, each with a specific
responsibility and its specific rules.

## Restrictions of the master branch

The master branch is a very specific branch in our workflow. No commit must
ever go directly into the master branch, and the code shall follow one and only
one path to get into the master branch.

## Coding for the project

### Branching Guidelines

In order to work on the Project, any contributor will be asked to create
separate branches for each task. Theses branches are part of the "Work In
Progress" aka `WIP` branches. A contributor must thus create a branch, that he
can push into the project's repository. He can then start working, and commit
following the [guidelines](#committing-guidelines).

The branch name shall follow a very concise naming scheme, in order for an
**automatic CI system to be able to start builds on every development branch**:

```
dev/tag/name
```

The `WIP` branch name must start by a branch type, on which depends the rest of
the naming scheme for the branch.
The following branch types are currently defined:

* dev: Development work
* proto: Prototype development (is not exempted from following the
  contributing guidelines, except for the testing aspect, as it provides only
  prototypes and not production-ready code)

The dev `WIP` branch names must start by the branch type (`dev/`, followed by a
`tag` defined to describe the type of task the branch is associated with, then
followed by a self-explanatory `name` for the branch. The following Tags are
currently allowed:

* FT: Feature branch
* BF: Bugfix branch
* HF: Hotfix branch (fundamentaly an emergency Bugfix branch)
* DOC: Documentation branch
* CLEANUP: Code Cleanup/Refactoring branch
* ...

For instance, if contributor A was going to work on the feature adding
squeaking sounds to his favourite VCS, he could name his branch:

```
dev/FT/SqueakOnPush
```

This would mean that it is a working branch for a Feature called "Squeak On
Push".

In the same fashion, the prototype branch names must start by the branch type
(`proto/`, followed by a self-explanatory `name` for the branch's explorated
feature. For instance, if contributor A was going to experiment on a new
algorithm, he could name his branch:

```
proto/AwesomeAlgorithm
```

When the contributor's work (feature/bugfix/hotfix) is complete, he can create
a pull request from his branch into the master branch. Then, the code merging
process described in [Merging code into the
master](#merging-code-into-the-master) starts.

### Development Guidelines

With his own `WIP` branch, contributor A can now manage the branch's code as
he wishes, as the branch is his own responsibility, within the constraints of
the project. These constraints include:

* Complying to the [Coding Style Guidelines](#coding-style-guidelines)
* Providing the proper tests to validate the proposed code

In order for the project to be as stable as possible, every piece of code must
be tested. This means that any code submission must be associated with related
tests or changes on the existing tests, depending on the type of code you
submitted.

#### The different types of tests

Please see our [testing guidelines](TESTING.md)

#### Documenting the Integration Test Plan

The integration tests scenarios must be documented into a proper .md document
called `TESTING.md`. That's what we call the `Test Plan` of the project. This
document must describe and explain properly the following elements for each
scenario:

- The architecture of the software components taking part in the test (where
  do the components run, in the same host?  different hosts?  other?)
- What feature is being tested?
- If relevant, what aspect/mechanism of the feature is being tested/proved?
- How is the feature tested? With what behavior?
- Why is it being tested this way?

This document needs not go into the detail of how the test is implemented, and
shall not explicitly name third-party software used as the test's
implementation, but describe the required functionalities from the third party
tools and libraries. This should allow to switch any third-party tools without
impacting the Test Plan itself.

#### Naming and organizing the tests

For harmonization purposes, every portion of the project shall follow the
following naming scheme for the tests, as well as the directory schema to store
them.

All the tests shall lie in a `tests` directory, in which one shall find one
directory per type of test, and utilities used only in the tests in an `utils`
directory:

```
 /home/contributor/project/lib/
                           tests/
                           tests/utils
                           tests/unit
                           tests/functional
                           tests/performance
```

Within the unit test directory, all tests shall be independent, as any unit
test should not depend on any other feature than the logic it is testing. As
such, it is not required that the tests bear any number to force any kind or
order in their listing or execution. Now, a proper semantic naming shall still
be of great help to identify the meaning and the aim of each test. Thus, the
test's names shall bear the meaning of what they are actually testing, in terms
of component and scenario, as much as possible. For instance, a test on one
component called 'Marble', for the API function that defines the users, and
that tries to use an invalid name would be called
`marble_api_user_def_name_invalid`. The names are expected to be a bit long,
but they have to be clear about what the file tests.

Within the functional test directory, some tests might have a dependency over
other tests. Because of this, the naming scheme includes a number, allowing to
list the tests in an orderly fashion, and taking into account the dependencies.
For instance, similarly to the previous example, a test could be called
`01_marble_api_user_def`, while another test depending on that one could be
called `02_marble_api_user_group_add`, which would use part of the code tested
by the previous test.

Inside the performance test directory, the tests shall be independant, as any
performance test will put the accent on a specific functionality, and shall be
runnable without depending on the other tests. The names shall follow the same
naming rules as the unit tests, which is bear the meaning of what's being
tested, including the module, the function, and the specific case tested.

### Committing Guidelines

With his own `WIP` branch, contributor A can commit and manage the branch's
history as he wishes, as the branch is his own responsibility, within the
constraints of the project. These constraints for the commits include:

* Commit Message Formatting Policy
* Peer validation of the commit's atomicity and meaningfulness

It is asked of every contributor to provide commit messages as clear as
possible, while attempting to make one commit comply to the following
conditions:

* Provide one and only one feature/bugfix/meaningful change
* Provide working unit and functional tests associated to the change.

The commit message shall follow a **standardized formatting, that will be checked
automatically by a VCS hook on the commit**.

The first line of the commit message (often called the one-liner) shall provide
the essential information about the commit itself. It must thus provide a tag
describing the type of development task accomplished and a short imperative
sentence to describe the essence of the commit. Then, if more details seem
necessary or useful, one line must be left empty (to follow the consensual git
commit way), and either a paragraph, a list of items, or both can be written to
provide insight into the details of the commit. Those details can include
describing the workings of the change, explain a design choice, or providing a
tracker reference (issue number or bugreport link).

Sticking with the earlier example of the Squeak-On-Push mobile app feature, we
could have a commit formatted such as:

```ascii
FT: Provide an API (hook) to add custom actions on VCS push

Related to issue #245
* Provide a simple way to hook a callback into the new OnPush API
* The hook is called whenever the history is pushed to the central system
* Multiple callbacks can be registered for one hook
```

The tags used in the commit message shall follow the same scheme as the tags
present in the `WIP` branch names, described in the
[Branching Scheme](#branching-guidelines).

### Sign your work

In order to contribute to the project, you must sign your work. By signing your
work, you certify to the statements set out in the Developer Certificate of
Origin below (from
[developercertificate.org](http://developercertificate.org/)):

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
1 Letterman Drive
Suite D4700
San Francisco, CA, 94129

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Signing your work is easy. Just add the following line at the end of each of
your commit messages. You must use your real name in your sign-off.

```
Signed-off-by: Jane Doe <jane.doe@email.com>
```

If your `user.name` and `user.email` are set in your git configs, you can sign
each commit automatically by using the `git commit -s` command.

## Merging code into the master

Once the work on his `WIP` branch is complete, contributor A can submit a
`Pull-Request` to merge his branch into the `master` branch. At this point,
every contributor can review the `PR`, and comment on it. Once at least two
contributors validate the PR through an ostensible "+1" comment, we deem the
code change validated by enough peers to assume it is valid. Then, the core
members of the project can act on the `PR` by merging the given commits into
the `master` branch.

The code reviews must include the following checks:

* Ensuring the compliance to the coding style guidelines
* Ensuring the presence and coverage of tests (unit, functional and
                                               performance)
* Ensuring the code is functional and working, through the tests
* Ensuring the commit messages were properly formatted and as atomic as
  possible

## Managing and Maintaining Releases

Any merge into the `master` branch yields a potential `Release Candidate`. This
does not mean that every merge into the `master` branch will automatically
generate a release, though. When the team deems the state of the project worthy
of a `release` (be it due to a specific set of features making it into the
`master` branch or anything else), A specific `release` branch is created
starting from the specific merge commit bringing in the last relevant change.

```ascii
   WIP Branches         master        Release Branches
                          |
                          X
                          | \   stable/1.0
                          |  +>--->---->-->+
                          |                |
                          v                v
```

In order to distinguish release branches from the `WIP` branches, they also
follow a concise naming scheme. As such, every release branch shall be named
after the version (major and minor) they embody. Indeed, the name shall begin
with "stable/", then followed by the version's major number, a dot, and finally
the version's minor number. This way, we can follow the semantic versionning
scheme, increasing the version's patch number for each bugfix brought into the
release branch. For instance, for the 2.4.X version of the product,
the branch would be named:

```
stable/2.4
```

In order to bring specific bugfixes or hotfixes into the release branch, the
patch has to go through the whole process of being reviewed before it's merged
into the `master` branch, and only then can it be cherry-picked (using the -x
option, in order to keep a reference to the original commit in the new commit
message) from the `master` branch to the given `release` branch. Then the
maintainer can bump the patch version of the given `release` branch.

```ascii
   WIP Branches         master        Release Branches
                          |
                          X
           dev/BF/flow  / |
    +<-----<-----<---<-+  |
    |                     |
    X                     |
    |                     X
    X                     | \   stable/1.0
    |  merge bufix into   |  +>--->--->--->+ # Set version to 1.0.0
    +->---->---->----->+  |                |
        master branch   \ |                |
                          X--->---->---->--X # Bump version to 1.0.1
                          | cherry-pick -x |
                          |                |
                          v                v
```

## Coding Style Guidelines

This Coding Style guidelines exist for one simple reason: working together.
This means that by following those, the different contributors will naturally
follow a common style, making the project unified in this aspect. This will
prove to be a good way to minimize the time waste due to trying to read and
understand a code with completely different standards.

If any rule seems out-of-bounds, any contributor is welcome to discuss it, as
long as he/she follows the rules set for the project. A configuration file for
ESLint shall accompany this Coding Style Guidelines in order to help enforce
as much as possible of it.

**As a first note, the rules for this project rely on [AirBnB's
coding style
guidelines](http://github.com/airbnb/javascript/blob/master/README.md).**

Following are the amendments that we chose to bring on top of the quoted
guidelines, in order to better fit our project.

## Irrelevant Sections

Sections 3.2, 3.3 and 25 of AirBnB's guidelines are irrelevant for our nodejs
use, as they relate to Jquery code, and to features relating to some specific
web browsers. They shall be ignored.

## Modified Sections and Rules

### [Whitespace](http://github.com/airbnb/javascript/blob/master/README.md#whitespace)

* [18.1](http://github.com/airbnb/javascript/blob/master/README.md#18.1)
  Use soft tabs set to 4 spaces for the indentation of the code. Although this
  will reduce the efficient line length, this rule will result in easier
  readability.
  ```js
  // bad
  function() {
  ∙∙const name;
  }

  // bad
  function() {
  ∙const name;
  }

  // good
  function() {
  ∙∙∙∙const name;
  }
  ```

## Additional Rules

### Blocks

* [16.3](#16.3) Do not use one-line blocks for conditions. This reduces
  readability by deviating from the usual way people read code, interfering with
  both their habits and their reading flow.
  ```js
  // bad
  if (test)
     return false

  // bad
  if (test) return false;

  // bad
  if (test) { return false; }

  // good
  if (test) {
      return false;
  }
  ```

### Comments

* [17.6](#17.6) Even though single line comments are accepted, try to minimize
  them, as they are often forgotten when updating the code, and can thus easily
  get out of sync with the code itself.

* [17.7](#17.7) No commented code shall find its way to the codebase, as it is
  useless visual clutter with limited meaning most of the time, and is
  often outdated when it has a meaning. Prefer using `TODO` markers within
  comments to explain something instead.

* [17.8](#17.8) API functions must be preceded by a small
  doxygen/jsdoc-formatted explanatory comment: What is the role of the function,
  what are the parameters, what are the possible return values, and whether it
  can throw exceptions:
  ```js
  // bad
  /*
   * The blipMyFunc function takes one function in parameter and returns
   * true only when the given function fits a random criteria using the
   * parameter string.
   */
  function blipMyFunc(func, str) {
      ...
  }

  // good
  /*
   * This function blips a function using the parameter string str.
   * @function
   * @param {function} func  the function to blip
   * @param {String} str     the string to blip the function with
   * @return {boolean} true if func fits a random criteria using str
   * @return {boolean} false if func does not fit a random criteria using str
   * @throws {Error} Invalid Parameters
   */
  function blipMyFunc(func) {
     ...
  }
  ```
  Complex internal functions shall also be described through such a comment.

* [17.9](#17.9) Complex parts of the code shall be preceded by a comment block
  explaining the WHY, the HOW, and the WHAT FOR. This also includes explaining
  the choice of the method or tool in a similar manner.

* [17.10](#17.10) Avoid paraphrasing the code through the comments, as it is
  not useful and generates noise for code reading (reviews included)

### ECMAScript 6 Styles

* [27.2](#27.2) In order to use the full power of ES6 with nodeJS v4, the use
  of the npm module [Babel](http://babeljs.io/) is required. It provides a
  seamless way to translate code written in ES6 to ES5 without the intervention
  of the developer. It will provide all the missing ES6 features to nodeJS which
  ES6 support is currently incomplete. Using Babel within your NodeJS code:
  ```js
  'use strict';
  require('babel/register');

  var MainClass = require('../mainClass.js');
  var prog = MainClass();
  prog.start();
  ```

  Using Babel for mocha tests:
  ```shell
  Prompt> mocha test.js --compiler js:babel/register
  ```

  Only the entry points of the programs are exempted from being written in ES6,
  due to the way Babel is used.

### Coding Style General Rules

* [29.1](#29.1) The usage of the use strict directive is required at the start
  of each file of code:
  ```
  'use strict';
  ```

* [29.2](#29.2) No line shall be longer than 80 characters, as such a length
  can provide, within modern working setups, the possibility to work on
  multiple files at the same time on one screen.

* [29.3](#29.3) When naming Types, functions and variables, use semantically
  correct names that describe their use and objective.
  ```
  // bad
  let test = true;

  // bad
  let human = true;

  // good
  let userIsHuman = true;
  ```

### Avoiding the Callback Hell

* [30.1](#30.1) No nested callback shall be longer than 5 lines. Any nested
  callback longer than this deserves its own proper function. Any such function
  that requires the binding of arguments from the parent function, should use
  [Currying](https://en.wikipedia.org/wiki/Currying). This is a functionnal
  programming technique that allows the binding of arguments to a function, and
  is available in NodeJS. Those currying functions should have a name explicitly
  telling the developer that they are generating functions, otherwise it might
  become easily confusing for the reader of the code.
  ```js
  // Bad (too many lines/nestings for a nested function definition)
  function do_step1(err, value) {
      var name = 'step 1';
      do_async_call(data, function do_step2(status, data) {
                       console.log(`${name} : ${status} -> ${data}`);
                       if (data) {
                         writeFile(data, function writeDone(err) {
                             if (err) {
                                 throw new Error(`Could not write data to file: ${err.message}`);
                             }
                             console.log("Wrote file successfully");
                         });
                       }
                    });
  }

  // Good (Arrow syntax is not prefered, but it's okay)
  function do_step2(name, status, data) {
      console.log(`${name} : ${status} -> ${data}`);
      ... // A number of operations here, making the function too long to fit.
  }

  function do_step1(err, value) {
      var name = 'step 1';
      do_async_call(data, (status, data) => { do_step2(name, status, data); });
  }

  // Good (Less than 5 lines, so it's ok)
  function do_step1(err, status, data) {
      var name = 'step 1';
      do_async_call(data, function do_step2(status, data) {
                       console.log(`${name} : ${status} -> ${data}`);
                    });
  }

  // Best (Fully using Currying, the async call is easy to read)
  // Also, the name is explicit in the way it says it generates something)
  function generateStep2(name) {
      let step2 = function do_step2(status, data) {
          console.log(`${name} : ${status} -> ${data}`);
          ... // A number of operations here, making the function too long to fit.
      };
      return step2;
  }

  function do_step1(err, value) {
      var name = 'step 1';
      do_async_call(data, generateStep2(name));
  }
  ```

### Strict equality

* [31.1](#31.1) In the same manner `===` should be used instead of `==`,
  defaulting missing variables should not be done using `||` unless there is a
  specific and good reason.

  Example:

  ```js
  // bad
  function f(arg, optionalArg, opts = {}) {
      const message = optionalArg || 'not set';  // what if arg === ''?
      const rate = opts.rate || 0.1;             // what if arg === 0.0?
  }

  // bad
  const useUnicode = ENV['USE_UTF8'] || true;    // what if arg === false?

  // good
  function f(arg, optionalArg = 'not set', opts = {}) {
      const rate = opts.rate !== undefined ? opts.rate : 0.1;
  }

  // good, with some input checking
  function f(opts = {}) {
      if (opts.msg !== undefined)
          assert(typeof opts.msg === 'string', 'opts.msg must be a string');

      const message = opts.msg !== undefined ? opts.msg : 'not set';
  }

  // good
  const useUnicode = ENV['USE_UTF8'] !== undefined : ENV['USE_UTF8'] || true;
  ```

  Why? Because `||` does not check for strict equality. So if an user passes `0`,
  `false`, `null`, `''`, etc. as an argument, it will be defaulted while it
  shouldn't be. Try this in a node prompt:

  ```js
  > 43 || 'DEFAULT'     // 43
  > 0 || 'DEFAULT'      // 'DEFAULT'
  > false || 'DEFAULT'  // 'DEFAULT'
  > null || 'DEFAULT'   // 'DEFAULT'
  > '' || 'DEFAULT'     // 'DEFAULT'
  ```

### Logging

The logging framework used is [werelogs](https://github.com/scality/werelogs)
which provides per-request logging in addition to module logging. This part of
the guidelines attempts to standardize log messages across the whole product to
ease reading, understanding and troubleshooting by being systematic.

#### Request Tracking

When a new request is received, a new per-request logger can be instantiated.
The `X-Scal-Request-Uids` HTTP header can be used to transmit request
identifiers from this logger across all the daemons involved when HTTP is the
chosen protocol. When there is no process barrier crossed or when the protocol
used is not HTTP, the request identifier can be serialized and carried by
whatever means necessary (eg. an optional field in protobuf messages or an extra
argument in APIs).

Usually the request logger is directly used for the whole lifecycle of the
request. Externally-maintained client libraries can take a serialized request
identifier as an argument to instanciate their own logger, which can be useful
for log searching purposes.

Components receiving such request identifiers to participate in per-request
product-wide logging must be robust to `null` or `undefined` or missing request
identifiers.

#### Levels

**FATAL**: logs errors that will abort the process

**ERROR**: logs errors that are not recoverable (other than errors due to user input)

**WARN**: logs errors that are recoverable (other than errors due to user input)

**INFO**: logs info about each request received

**DEBUG**: logs the high level steps and component interactions while processing
a request and any details of user input errors

**TRACE**: logs variables, parsed data, etc.

Note that an `error` log triggers a full log buffer dump by werelogs (in a
typical configuration).

#### Phrasing

Log messages are short phrases (fewer than 10 words), starting with a lowercase
letter. They should use past tense to indicate that something already happened
and is finished, and present continuous to indicate that something is ongoing.
No punctuation is needed at the end of the phrase as formatters can later append
more information to the line.

To avoid string building as much as possible, especially for messages that will
never be printed, the extra-fields form of werelogs methods can be used, giving
context outside of phrases. On top of being computationally lighter, this
approach has the advantage of leaving the formatting to the presentation layer
(freeing the developer from it), and producing semantically-annotated messages
that can be analyzed and searched by specialized tools.

Obviously no sensitive information such as access key secrets can make it to
the logs.

##### Examples

```js
// bad
log.info(`compute signature for ${accessKeyId} (${algorithm})`);
// good
log.debug('computing request signature', { accessKeyId, date, algorithm });

// bad
log.info(`host ${server} is down!`);
// good
log.error('bucket metadata update failed',
          { bucketName, server, error: errorObject });
```

#### Fields

Fields added as context to log messages should use consistent names across the
product to ease searching, matching and building health dashboards. Here is a
non-exhaustive list of field names to use:

* Generic
  * `bucketName`
  * `objectKey`
  * `partId`
  * `accessKeyId`
  * `attemptsLeft`
  * `totalAttempts` (for the number of times we tried something before deciding
    to fail)
  * `duration` (in microsecs)
  * `date`
  * `endpoint` (can be any service endpoint formatted as `address:port` for
    remote service such as `bucketd`, `vaultd`, `repd`, etc)
  * `method` (method being called in an API)
  * `error` (as an `arsenal.errors.ArsenalError` object)
* S3 specific
  * `clientIP`
  * `namespace`
  * `sproxydObjectKey`
* Metadata specific
  * `raftSession`
* Vault specific
  * `algorithm`
  * `entityType`
  * `entityContent`
  * `authenticationDetails`
  * `stringToSign`

This list will grow as logging context needs are explored.
