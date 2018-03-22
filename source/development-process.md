---
title: Development Process
type: community
has_chapter_content: false
version: 2.1
---

# Development Process

This document describes how to contribute changes to the Weex source code. Below are the recommended steps.

## 1. Choose or Create a JIRA issue

Generally, Weex uses [JIRA Issue](https://issues.apache.org/jira/projects/WEEX) to track all types of code changes and not just bug fixes, and uses Github pull requests to manage the review and merge of specific code changes. That is, JIRAs are used to describe *what* should be fixed or changed, and high-level approaches, and pull requests describe *how* to implement that change in the project’s source code.  

Be sure to search the issues before creating new ones to avoid duplication. If your change may be controversial, you may want to create a discussion in the [weex-dev](mailto:dev@weex.incubator.apache.org) mailing list.

**Every pull request should correspond to a issue in JIRA.**

## 2. Develop Your Changes

1. [Fork](https://help.github.com/articles/fork-a-repo/) the Github repository at [https://github.com/apache/incubator-weex](https://github.com/apache/incubator-weex) if you haven’t already. 

2. Clone your fork, create a new branch to push your commits to.

3. Develop your feature or bug fix. Make sure your changes meet the [code style guidelines](/development-process.html#code-style-guidelines).

4. Copy and paste this to the top of your new file(s):

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

5. Documentation and tests should be added or referenced if they need to be added or updated as part of the change.

6. Commit to your branch following [commit guidelines](/development-process.html#commit-guidelines).

## 3. Create a Pull Request

[Open a pull request](https://help.github.com/articles/using-pull-requests/) against the `master` branch of `apache/incubator-weex`. Make sure it meets these guidelines:

1. One pull request for one issue
2. The PR title should be of the form `[WEEX-xxxx][COMPONENT] Summary`, where `xxxx` is the relevant JIRA number, `COMPONENT` is one of the PR categories(android, iOS, jsfm, web, doc, website, example, test, other) and Title may be the JIRA’s title or a more specific title describing the PR itself.
3. If the pull request is still a work in progress, and so is not ready to be merged, but needs to be pushed to Github to facilitate review, then add `[WIP]` after the component.

## Code Style Guidelines 

### Objective-C

- Tabs for indentation(not spaces)
- `*` operator goes with the variable name (e.g. Type *variable;)
- Function definitions: place each brace on its own line.
- Other braces: place the open brace on the line preceding the code block; place the close brace on its own line.
- Use `#pragma marks` to categorize methods into functional groupings and protocol implementations
- Follow other guidelines on [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide)

### Java & Android

- Use [Google Java Style](https://google.github.io/styleguide/javaguide.html) as basic guidelines of java code.
- Follow [AOSP Code Style](https://source.android.com/source/code-style.html) for rest of android related code style.

## Commit Guidelines 

Use the following form to write commit descriptions:

```markdown
Summary of change, same as PR title: `[WEEX-xxxx][COMPONENT] Summary`

Longer description of change addressing as appropriate: why the change
is made,context if it is part of many changes, description of previous 
behavior and newly introduced differences, etc.

Long lines should be wrapped to 80 columns for easier log message 
viewing interminals.

Bug: 123456
```

A short subject and a blank line after the subject are crucial. Use the bug number from the JIRA issue.

Some good thoughts on how to write good git commit messages can be found [here](https://chris.beams.io/posts/git-commit/).



