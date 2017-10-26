---
title: Bug Report Guidelines
type: community
has_chapter_content: false
version: 2.1
---

# Bug Report Guidelines

This document describes how to write a good Weex bug report. Good bug reports help developers to classify the priority and severity of a bug properly, which helps the bug get fixed as soon as possible. The more specific information you provide, the better your bug gets understood.

## Bug Report General Principles

- Avoid duplicates: Search before you file a new one!
- Always test the latest available version before submitting a bug.
- One bug per report.
- State useful facts, not opinions or complaints.

## How to Write a Good Bug Report

A good bug report should include the following information:

### Title 

The goal of title is to make the report searchable and uniquely identifiable.

A bad example: `List Crash`

A good Example: `List Crashes when deleting a header`

### Environment

**Weex Version**: Please identify the version of WeexSDK or Weex Playground or weex-toolkit you were using when the bug occurred

**Device environment**: Please identify the device model, platform and OS version. e.g. , iPhone 6, iOS 10.3.

### Overview/Description

The overview or description of a bug report is to explain the bug in detail, including:

- Justifications of why this is a bug
- [dotwe](http://dotwe.org/vue/) demo that can reproduce the bug
- Screenshots for visual bugs
- Stack traces for crash bugs
- Console logs or error messages which are relevant in the bug

### Steps to Reproduce

The aim to provide the reproducible steps is to enable developers to reproduce the bug in their own environment. Here's an example:

*Step 1: Load the demo using Weex Playground*

*Step 2: Scroll to the bottom of the list*

*Step 3: Click the red button to delete a header*

### Test Results

The test results, including *Expected Result* and *Actual Result*, will tell developers what's wrong. *Expected Result* describes what should happen, and *Actual Result* describes what actually happens.

## Reference

This document is a modified version of [1].

 [1] http://testthewebforward.org/docs/bugs.html

