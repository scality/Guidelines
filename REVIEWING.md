# Review process

Code review is an essential part of our project. It allows us to increase the
quality of the code while permitting everyone to gain from each other's
perspective.

## Preparing for a code review

People will spend time reviewing your code. Easing the process for them can
only make everyone happier.

A few steps are key for that:

- Big PRs are hard to review and will take a long time to actually get merged.
  PR can be up to 400 changed lines to facilitate the reviewer's job. Ask
  yourself this question:
  - Is it possible to make smaller incremental PRs? If that's the case, please
    go ahead and do it! Commits are atomical changes, and PR molecular changes
  - If not, splitting this into atomical changes will ease the burden on the
    reviewer
- Documentation can go a long way for reviewers, some JSDoc brings a lot to the
  table, and eases the review process for everyone
- Tests are important, if you add a feature, add the corresponding tests that
  check the desired behaviour (and edge cases). You can define the scope of your
  test with the scope of your feature/fix:
  - Is the code valid by itself? -> unit tests
  - Does it have negligible impact on code outside of itself? On the component
    behaviour? -> Functional tests
  - Has it a marginal impact on other components? -> Integration tests
  - Is it a big change for everyone? -> End to end tests
  - Never forget to write regression tests to ensure that we'll never break our
    databases format
- PRs should not add any lint/compilation warning
- Linter fixes should be done when an edited line is concerned by a lint issue,
  do not go out of your way to fix things (Cleanup PRs are ok though, to avoid an
  accumulation of warnings)
- Silent fixes should not exist, creating a separate PR for that will make it
  easy to review/merge quickly and independently
- Limit the number of PRs you actually have opened, 3 is a good number, at
  5, ultron will soon close them automatically. Maybe you can take some time to
  review your peers' PRs? ;)
- With the new github features, do not squash/amend heavily but prefer adding
  small commits that you can squash at the end, it will make it easy to review
  the last changes

## Reviewing your peers, the gentle way

We're all human beings, we can't possibly know everything about every project,
asking questions is perfectly fine when some piece of code seems a bit obscure.
Take care not to block the process for a trivial question, that can easily be
ignored.

Giving a :+1: should be incidental, not the standard. This doesn't mean being
too picky about the syntax, we have tools in place to detect style issues, but
rather raise relevant questions and argue about the design and/or the
performance:

- Is it easily understandable? If not, you can suggest to add comments in the
  function description (Not in the body, cf. coding guidelines)
- Do you think you could take over that particular piece of code later on? If
  not, suggest maintainability improvements.
- If the PR impacts external interfaces, was the `DESIGN.md` updated to reflect
  that?
- Always keep performance in mind, and do not hesitate to raise concerns about
  a particular piece of code

No PR is perfect, and more often than not, explaining the design
choices can lead to a better understanding for both parties.

Don't forget that behind each PR is a human being, saying that something is
outright bad is not the way to point out what you think is an issue. It can
be hard to convey, but we should try nonetheless especially when we're working
on different timezones, and are very prone to sound more stringent that we mean
to be. Facts are also a good way to get a point across.

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
should be your friend there.

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

Ultron will provide a few more uses in the future:

- Automatic merging once there is no blocker, enough peer validation and if the
  PR has been up long enough
- Warn for stale branches
