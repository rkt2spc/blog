---
title: Starting a Blog
date: '2023-07-20'
tags: ['blog', 'life', 'react', 'nextjs', 'tailwindcss', 'typescript']
summary: My motivation for starting this blog and some background on it
draft: false
---

# Motivation

It's 2023, shortly after becoming a father, I suddenly realized that I was getting old and decided to start this blog hoping to leave traces of my limited human existence in this world.

# To Build or Not To Build

Before starting this, I asked myself: why don't I just use [Medium] or [Substack]? Why build my own blog?

The answer was I want to make this blog personal, my own sanctum, my home on the internet. I want to be able to customize it however I want, to the smallest details. It should give an experience that is uniquely mine.

# The Tech

After decided on building my blog, I need to choose a technology to build it with. There exist many technology choices for building a blog nowadays, from static site generators like [Jekyll] or [Hugo], to writing it from scratch using a front-end library like [React].

I happen to be familiar with React. Thanks to frameworks like [NextJs] or [Gatsby], React development is now much more pleasant than what it used to be. You no longer have to worry about configuring bundlers like [Webpack], or how to do client side routing properly. I ended up picking NextJs as I've heard many wonderful things about it.

# Baby Steps

NextJs is not too difficult to learn if you're already familiar with React. It literally took me half a day to get the first version of my blog up and running. Maybe that's how NextJs was designed, to make you feel ultra productive.

Then, I decided to try [TypeScript], as I am used to typed languages from the other developments at my current and previous fulltime jobs.

Surprisingly, starting with TypeScript in NextJs is extremely easy, especially when you don't have to configure Webpack yourself. I can go straight to learning TypeScript.

My experience with TypeScript was that it's just Javascript with types. You only need to learn how to declare type/interface and then start annotating variables and function arguments with them. It brings you many benefits:

- You can declare what type you're expecting and not having to worry about mistakenly passing a boolean to a string.
- You explicitly know if your function is returning multiple different types (null | undefined | number | string). This is the cause of most common problems that I encountered while using regular Javascript. You can then handle the return properly, or better, refactor your functions so they don't return different types!

So I spent the rest of the day TypeScript-ing my blog. The linter (I use [eslint]) helped a lot, it tells you when you should annotate with types, or when the types can be inferred.

I finally had a basic working version of my blog in TypeScript!

# Beauty in the Beast

My blog was running. But oh boy, it is ugly! How can website look good without some CSS styling eh?

To be completely honest, CSS isn't my thing. But that's how the web came to be and complaining about it won't do much help.

Initially, I went with [Bootstrap] and [React Bootstrap] as I've used them before in one of the projects way back in my university days. It gives a very plain, boring look.

Then I discovered [Tailwind CSS] while browsing through NextJs documentation. It has certain notable features:

- It scans your React code and only produces the CSS class that you actually use.
- It has an easily configurable theme-ing system.
- It generates state modifier (`hover:`, `focus:`, `dark:`) for most of it's classes, so you can do conditional styling without needing to write your own CSS.
- It has built-in classes to cover pretty much all CSS features.

But one major downside it has compared to Bootstrap is that it lacks an actual components system (although you can get some free component examples from [Tailwind UI], there are no classes specific to a component in Tailwind CSS)

I decided to give it a try anyway since I like how easily styling was with it.

It forced me to build all the components in my blog from scratch, but fortunately I didn't have too many of them and they turned out looking just the way I like.

# Tailwind NextJs Starter Blog

Some time later I stumbled upon Timothy Lin's [Tailwind NextJs Start Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

It is **packed** with features. If only I had discovered it sooner 😭

By now it's already too late to just fork it and do basic modifications:

- It's written in Javascript and my blog is already in TypeScript
- It uses NextJs legacy [Page Router](https://nextjs.org/docs/pages) while I already used the latest [App Router](https://nextjs.org/docs/app) with [React Server Component](https://nextjs.org/docs/getting-started/react-essentials#server-components), which is the default in NextJs 13 since I started learning.
- It uses [mdx-bundler] while I used [@next/mdx] to render my Markdown posts.

I ended up cherry-picking some features I like from it into my blog:

- After careful consideration between [@next/mdx], [mdx-bundler] and [next-mdx-remote] I chose mdx-bundler as it is the most features rich while also being independent from Webpack
- The Tags page. My posts had no tags in them 😂 (I did fix some wonky CSS issues to make it look more consistent on smaller screens)
- The Blog List Page. Specifically pagination and searching.
- Rendering the Author page using MDX. Mine was just a regular React page.
- Theme switching / Jump to top button
- Sitemap and SEO, although NextJs 13 does [Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) and [SEO](https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api) very differently compared to it, I doubt I wouldn't even bother doing SEO without reading Tim's works.
- RSS feed generation.

All and all, thanks [Tim](https://github.com/timlrx) for producing this amazing work. Without reading it, my blog would never become as it is today.

# The Learnings

By building this blog I have learned:

- [TypeScript]
- [NextJs]
- [Tailwind CSS]
- Some [SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) techniques

It's been a great journey so far so I have decided to document it as the first post on this blog.

Thank everyone for reading!

[Medium]: https://medium.com
[Substack]: https://substack.com
[Jekyll]: https://jekyllrb.com
[Hugo]: https://gohugo.io
[React]: https://react.dev
[NextJs]: https://nextjs.org
[Gatsby]: https://www.gatsbyjs.com
[Webpack]: https://webpack.js.org
[TypeScript]: https://www.typescriptlang.org
[eslint]: https://eslint.org
[Bootstrap]: https://getbootstrap.com
[React Bootstrap]: https://react-bootstrap.netlify.app
[Tailwind CSS]: https://tailwindcss.com
[Tailwind UI]: https://tailwindui.com
[mdx-bundler]: https://github.com/kentcdodds/mdx-bundler
[@next/mdx]: https://www.npmjs.com/package/@next/mdx
[next-mdx-remote]: https://github.com/hashicorp/next-mdx-remote
