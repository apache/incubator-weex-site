---
title: Bug Report Guidelines
type: community
has_chapter_content: false
version: 2.1
---

# Bug Report Guidelines

This document describes how to write a good Weex bug report. Good bug reports help developers decide an appropriate priority and severity for a bug, and increase the chance that a bug will be fixed quickly. The more specific information you can provide, the better.

## Bug Report General Principles

- Avoid duplicates: Search before you file!
- Always test the latest available version.
- One bug per report.
- State useful facts, not opinions or complaints.

## How to Write a Good Bug Report

A good bug report should include the following information:

### Summary

The goal of summary is to make the report searchable and uniquely identifiable.

A bad example: `List Crash`

A good Example: `List Crashes when deleting a header`

### Environment

**Weex Version**: Please tell the version of WeexSDK or Weex Playground or weex-toolkit you were using when the bug occurred

**Device environment**: Please tell the device model, platform and OS version that your bug occurred on. e.g. , iPhone 6, iOS 10.3.

### Overview/Description

The overview or description of a bug report is to explain the bug to the developer, including:

- Justifications of why this is a bug
- [dotwe](http://dotwe.org/vue/) demo that can reproduce the bug
- Screenshots for visual bugs
- Stack traces for crash bugs
- Console logs or error messages which are relevant in the bug

### Steps to Reproduce

The goal of reproducible steps is to teach developer to recreate the bug on his own system, such as:

*Step 1: Load the demo using Weex Playground*

*Step 2: Scroll to the bottom of the list*

*Step 3: Click the red button to delete a header*

### Test Results

The test results, including *Expected Result* and *Actual Result*, will show the developer what's wrong. *Expected Result* describes what should have happened, and *Actual Result* describes what actually happened.

## Reference

This document is a modified version of [1].

 [1] http://testthewebforward.org/docs/bugs.html

