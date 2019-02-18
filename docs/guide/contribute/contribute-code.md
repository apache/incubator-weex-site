# Contribute Code

This page describes the standard procedure to modify code of weex.
## Before Coding
### Check License
Weex adopts [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/) as its open source license. Make sure your potential contribution obeys the requirement of Apache License 2.0.

### Bug or Feature ?
* If you are going to fix a bug of Weex, check whether it already exists in [Github Issue](https://github.com/apache/incubator-weex/issues). If it exists, make sure to write down the link to the corresponding Github issue in the PR you are going to create.
* If you are going to add a feature for weex, reference the following recommend procedure:
    1. Writing a email to [mailing list](how-to-contribute.html#mailing-list) to talk about what you'd like to do.
    1. Write the corresponding [document](how-to-contribute.html#contribute-code-or-document)


## Coding
1. [Fork](https://help.github.com/articles/fork-a-repo/) the Github repository at [https://github.com/apache/incubator-weex](https://github.com/apache/incubator-weex). 

1. Clone the forked repository and create a new branch from `master` to push your commits to.

1. Develop your feature or bug fix in your new branch. Make sure your code meets the [style guidelines](contribute-code.html#code-style-guidelines).

1. Add the **License** below to the top of any new file(s) you've added.
   
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
   
1. Commit all the changes to your branch.

:::tip
If you are writing Java or C++ with Android Studio, **License** will be added to the head of the file automatically.
:::

### Code Style Guidelines 

#### Objective-C

- Tabs should be used for indentation. Please do not use spaces.
- `*` operator goes with the variable name (e.g. Type *variable;)
- For function definitions, place each brace on its own line.
- For all the other braces, place the open brace on the line preceding the code block and place the close brace on its own line.
- Use `#pragma marks` to categorize methods into functional groupings and protocol implementations
- Follow other guidelines on [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide)

#### Java & Android

- Use [Google Java Style](https://google.github.io/styleguide/javaguide.html) as basic guidelines of java code.
- Follow [AOSP Code Style](https://source.android.com/source/code-style.html) for rest of android related code style.

#### C & C++

- Use [Google C++ Style ](https://google.github.io/styleguide/cppguide.html)  as basic guidelines of C++ code
- Weex defines [a subset of the Google C++ development specification](https://github.com/jianhan-he/C-Style-Guide/blob/master/C%2B%2B_Style_Guide_en.md) that covers some of the major C++ scenario usage specifications.

## Publish your Change
[Open a pull request](https://help.github.com/articles/using-pull-requests/) against the `master` branch of `apache/incubator-weex`. Make sure following guidelines are considered when creating a pull request.

1. One PR should solve only one problem.
1. The PR title should be the form of `[COMPONENT] Summary`:
    * `COMPONENT` is one of the mentioned PR categories (android, iOS, JsFm, web, test, etc..). 
    * `Summary` should be a brief description of your change within one sentence.
1. Content description of PR
    * If the PR is about fixing a bug *excluding crash*, a [demo](http://dotwe.org/vue) is necessary in code's description.
    * If the PR is about adding a new feature, another [PR for documentation](how-to-contribute.html#contribute-code-or-document) is necessary in codes' PR description.
    * *Optional* If the PR fixes an existing Github issue, you may add the link to the corresponding issue in the PR.

:::tip
Reviewing PR may take a great deal of time, please be patient. If your PR doesn't get response over 96 hours, you might send an email to [mailing list](how-to-contribute.html#mailing-list) to ask the progress.
:::