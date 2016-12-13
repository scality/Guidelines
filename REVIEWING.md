# Review process

Code review is an essential part of our project. It allows us to increase the
quality of the code while permitting everyone to gain from each other's
perspective.

## Preparing for a code review

People will spend time reviewing your code, as much as you will spend time
improving your code to answer their expectations. Easing this process can only
make everyone happier, and quicken it as a whole.

A few big subbjects, with each a few pieces of advice are key for that:

- General rules for PRs:

  - Address only one subject at a time: Silent fixes are bug fixes included in
    an unrelated change. They should never make it into the codebase this way,
    and the fix should be part of a separate PR, for that will make it easy to
    review/merge quickly and make it independent. This also eases
    forwardporting/backporting only the necessary bits when relevant.

  - Size of PRs: Big ones are hard to review and will take a long time to
  actually get merged. PRs can be up to 500 changed lines to facilitate the
  reviewer's job. Ask yourself this question:

    - Is it possible to make smaller incremental PRs? If that's the case,
      please go ahead and do it! Commits are atomical changes, and PR molecular
      changes

    - If not, splitting this into atomical changes (ie multiple commits in the
      PR) will ease the burden on the reviewer

  - Limit the number of PRs you actually have opened, 3 is a good number, 5 shall
    be tolerated for a number of very small PRs quick to review and thus merge.

  - Production of PRs and Review of PRs should observe a simple ratio. For each
    PR produced and merged, you should be participating in the process of
    merging two other PRs as a reviewer. This will allow to produce as many PRs
    as we merge, and keep the number of open PRs stable

- Documentation can go a long way for reviewers and knowledge transfer:

  - JSDoc for an API brings a lot to the  table, and eases the review

  - Comments explaining complex algorithms or implementation choices can reduce
    unneeded discussion on the minute details, as well as bring insight on the
    said implementation choice for the future, and backtracking of issues and
    their solutions

  - Documenting how to use your code if not in the JSDoc (although this part
    should be mandatory), can be done in some kind of markdown somewhere

- Tests are important, if you add a feature, add the corresponding tests that
  check the desired behaviour (and edge cases). You can define the scope of your
  test with the scope of your feature/fix:

  - Is the code valid by itself? -> unit tests

  - Does it have negligible impact on code outside of itself? On the component
    behaviour? -> Functional tests

  - Has it a marginal impact on other components? -> Integration tests

  - Is it a big change for everyone? -> End to end tests

  - Never forget to write regression tests to ensure that we'll never trigger
  bugs again

  - Never forget to write compatibility tests to avoid break our stored data
  formats and protocols

- Tool-related habits:

  - Linter:

    - PRs should not add any lint/compilation warning

    - Linter fixes should be done when an edited line is concerned by a lint
      issue, do not go out of your way to fix things (Cleanup PRs are ok
      though, to avoid an accumulation of warnings)

  - GitHub:

    - Per-commit diff view feature: It can be helpful to add new commits rather
      than squash and rebase early-on, to facilitate incremental reviews for
      your peers

    - Reactions Emojis: Do not hesitate to express your support through those,
      it can be a nice way to show support to others

    - Review UI: Use the review UI to do one big review, and post it as once,
    requesting changes, commenting or approving the PR. Please avoid requesting
    changes for only minor things that are "optional", as it may prevent
    merging.

## Reviewing your peers, the gentle way

We're all human beings, and we can't possibly know everything about every
project, asking questions is perfectly fine when some piece of code seems a bit
obscure. Take care not to block the process for a trivial question, that could
easily be ignored.

Giving an approval review should be incidental, not the standard. This doesn't
mean being too picky about the syntax, we have tools in place to detect style
issues, but rather raise relevant questions and argue about the design and/or
the performance:

- Is it easily understandable? If not, you can suggest to add comments in the
  function description or body, depending on the complexity of the code (cf.
  coding guidelines 17.9)

- Do you think you could take over that particular piece of code later on? If
  not, suggest maintainability improvements.

- If the PR impacts external interfaces, was the `DESIGN.md` updated to reflect
  that?

- Always keep performance in mind, and do not hesitate to raise concerns about
  a particular piece of code

No PR is perfect, and more often than not, explaining the design choices (in
the code or a markdown document preferably) can lead to a better understanding
for both parties. This is also a good learning experience for reviewers.

Don't forget that behind each PR is a human being, saying that something is
outright bad is not the way to point out what you think is an issue. It can
be hard to convey, but we should try nonetheless especially when we're working
on different timezones, and are very prone to sound more stringent that we intend
to. Facts are also a good way to get a point across, while keeping the
discussion objective and not personal.

## Getting reviews from your peers, the constructive way

As the coder is a human, the reviewer also is. As such, a few behaviors can
help going forward constructively, rather than building up tensions:

- Do not assume that the reviewer holds some kind of grudge or ill will against
  you. He/She is most probably trying to help you improve your habits and the
  code that both of you will be working on in the future.

  - The reviewer does not always have the solution to an issue he/she is raising,
  so don't hold it against him/her to have only raised the issue without
  further explanation. That is often also an opportunity to learn.

- Do not answer to review comments with sarcasm, or with a straight unwavering
  position. This is almost always received negatively, and greatly impacts
  further exchanges. Most people are bad at handling this kind of
  relationships, so let's not create them.

Essentially, we need to mind that the reviewers and coders are people too, with
their own problems, and be as kind and as explicit as possible in any
situation. That being said, we should not expect perfection from the others,
and we should be accepting of the communication mistakes of each other.

## Process

### Breaking changes

Breaking changes should be discussed with the management, for multiple reasons:

- Assess the exact need
- Agree on a tight specification

This should end up with a design document that can be discussed with the team.
Once an agreement is reached, you can go into PR state, following the specs
agreed upon. Reviews should take the design document into account when doing
the review. Keep in mind that you may have to do a review meeting to be able to
discuss some changes more thoroughly.

Don't forget to ensure backwards compatibility testing in that PR, Integration
should be your friend there, but functional tests could take care of it also.

### Tooling upgrades

Integration should provide a way to test backwards compat (to ensure no silent
breaking change):

- Run scenario with origin branch
- Interrupt and upgrade
- Finish scenario
- Check consistency

Ex of tests to run:

- Create account/user/AccessKey -> still valid
- Putting MPU; Reading/Listing MPU; resuming MPU after upgrade
- ACLS before/after
- Attributes before/after
- Object data before/after
- Bucket visibility before/after

### Tools to help you do your work

#### Federation

Federation is an installer for the S3 Connector project written using Ansible.
It is the unique mean to build Docker images for our product, and deploy it.
Also, it provides a few tooling playbooks (ansible concept) to operate on a
cluster, and facilitate testing.

##### EC2 Provisionning

A set of playbooks is provided by Federation to spawn and run an on-demand
Amazon-EC2 cluster of VMs with an appropriate configuration to run relevant and
realistic tests compared to what we usually deploy at a customer's site.

Please refer to Federation's READMEs to see how to use it.
Please refer to one of the managers or the tech lead to get your credentials
for Amazon EC2.

##### Security Cryptographic buffer generation

In order to ease the configuration steps of the environment you intend to
deploy, Federation provides a playbook that will generate the required random
buffers needed for internal cryptography needs.

Please refer to Federation's READMEs to see how to use it.

##### Credentials generation

Vault, the authentication management system of our product, has two kinds of
credentials. The first one is a kind of "super admin" access key and secret
key (see it as a login token and a password token), and the second kind is a
user-generated access key and secret key.

The first one is necessary at installation time, as it is used to configure
Vault.

The second one can only be generated and used once the product is up and
running. The utilities to generate those credentials may also be useful for our
users to setup a quick test platform.

#### Integration

Integration is the repository in our team where end-to-end test scenarios are
located. It also provides the associated automation tooling to ease our daily
work.

##### Nimrod

Nimrod is the python tool written in Integration that provides facilities to
define and write a new test scenario. In the future, we plan for it to allow
you to run a test suite up until a specific break point that you'll define
through the CLI; so that you can step in to run tests manually for any
debugging or test-writing operation.

It currently only provides build steps, and acts as a test runner, while
transmitting tunable environment variables provided to the CircleCI build to
Federation.

##### Ultron

Ultron currently provides the following features to help you:

- Trigger end-to-end testing from any PR in the project

- Test projects in a consistent environment (Allow testing small projects
 automatically patched into bigger ones)

Ultron will provide a few more uses in the future (non-exhaustive tentative
list):

- Automatic reporting of End-to-End test runs on the PR where it was triggered
  from

- Automatic rebase and merge of the PRs from a queue (including synchronized
  PRs) at the request of maintainers

- Warn for stale branches (open for more than 2 weeks, no activity since more
  than one week)

- Warn users that have a too big number of open PRs to urge them to contribute
  as reviewers.
