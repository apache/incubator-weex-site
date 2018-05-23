---
title: Development Process
type: community
has_chapter_content: false
version: 2.1
---

# Development Process

Contributions are always welcome, but it is very important to understand the development process to make contributing simpler. This document will help you understand how to contribute changes to the Weex source code. Below are the recommended steps.

## 1. Choose or Create a JIRA issue

Weex uses [JIRA](https://issues.apache.org/jira/projects/WEEX) to track all types of code changes and not just bug fixes. A JIRA ticket should be used to describe *what* should be fixed or modified and the high-level approach of *how* it will be fixed. We use Github pull requests to manage the review and merge specific code changes. Pull Requests describe *how* to implement that change in the project’s source code.  

If you would like to create a new issue on JIRA, be sure to search the existing issues and see if someone has already reported the same. It helps in avoiding duplication. If your change may be controversial, you may want to create a discussion in the [weex-dev](mailto:dev@weex.incubator.apache.org) mailing list.

**Every pull request should correspond to an issue in JIRA.**

## 2. Develop Your Changes

1. [Fork](https://help.github.com/articles/fork-a-repo/) the Github repository at [https://github.com/apache/incubator-weex](https://github.com/apache/incubator-weex). 

2. Clone the forked repository and create a new branch from `master` to push your commits to.

3. Develop your feature or bug fix in your new branch. Make sure your code meets the [style guidelines](/development-process.html#code-style-guidelines).

4. Add the below mentioned copyright notice to the top of any new file(s) you've added.

   ```javascript
   /*
    * Licensed to the Apache Software Foundation (ASF) under one
    * or more contributor license agreements.  See the NOTICE file
    * distributed with this work for additional information
    * regarding copyright ownership.  The ASF licenses this file
    * to you under the Apache License, Version 2.0 (the
    * "License"); you may not use this file except in compliance
    * with the License.  You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing,
    * software distributed under the License is distributed on an
    * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    * KIND, either express or implied.  See the License for the
    * specific language governing permissions and limitations
    * under the License.
    */
   ```

5. Documentation and tests should be added or referenced if they need to be added or updated as part of the change. Make sure to test your changes thoroughly.

6. Commit all the changes to your branch. [Commit Guidelines](/development-process.html#commit-guidelines) must be followed for better understanding.

## 3. Create a Pull Request

[Open a pull request](https://help.github.com/articles/using-pull-requests/) against the `master` branch of `apache/incubator-weex`. Make sure following guidelines are considered when creating a pull request.

1. There should be one pull request for one issue.
2. The PR title should be of the form `[WEEX-xxxx][COMPONENT] Summary` where `xxxx` is the relevant JIRA number and `COMPONENT` is one of the mentioned PR categories (android, iOS, jsfm, web, doc, website, example, test, other). `Summary` can be same as JIRA’s title or can also be a more specific title describing the PR itself.
3. If the pull request is still a work in progress but needs to be pushed to Github to facilitate review, then add `[WIP]` after the component. This also means that the PR is not ready to be merged.

**It is easier to review small pull requests and those are more likely to get merged. Prefer to split the PR if it includes changes for more than one thing.**

## Code Style Guidelines 

### Objective-C

- Tabs should be used for indentation. Please do not use spaces.
- `*` operator goes with the variable name (e.g. Type *variable;)
- For function definitions, place each brace on its own line.
- For all the other braces, place the open brace on the line preceding the code block and place the close brace on its own line.
- Use `#pragma marks` to categorize methods into functional groupings and protocol implementations
- Follow other guidelines on [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide)

### Java & Android

- Use [Google Java Style](https://google.github.io/styleguide/javaguide.html) as basic guidelines of java code.
- Follow [AOSP Code Style](https://source.android.com/source/code-style.html) for rest of android related code style.

## Commit Guidelines 

Following template should be used to write commit descriptions.

```markdown
Summary of change, same as PR title: `[WEEX-xxxx][COMPONENT] Summary`

Longer description of change addressing the following: Why the change
is made, Context if it is part of many other changes, Description of previous 
behavior and newly introduced differences, etc.

Long lines should be wrapped to 80 columns for easier log message 
viewing in terminals.

Bug: 123456
```

A short subject and a blank line after the subject are crucial. Use the bug number from the JIRA issue.

Some good thoughts on how to write better git commit messages can be found [here](https://chris.beams.io/posts/git-commit/).

## License
By contributing to Weex, you agree that your contributions will be licensed under its Apache License, Version 2.0.


