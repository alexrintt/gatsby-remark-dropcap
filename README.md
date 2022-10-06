## Installation

> **Warning** this is not npm hosted, so be careful if you want to depend on it, I recommend a fork instead a direct dependency.

To install from a GitHub source is pretty simple:

```shell
npm install alexrintt/gatsby-remark-dropcap
# or
yarn add alexrintt/gatsby-remark-dropcap
```

## Usage

This is a local subplugin of `gatsby-transformer-remark` forked from [gatsby-remark-dropcap](https://www.gatsbyjs.com/plugins/gatsby-remark-dropcap/)!

The usage is the same of [gatsby-remark-dropcap](https://www.gatsbyjs.com/plugins/gatsby-remark-dropcap/) but with an additional option:

```ts
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      ...otherRemarkPlugins,
      // The original [gatsby-remark-dropcap] plugin
      // was spamming dropcaps through the entire Mdast tree
      // cause it wasn't exiting after the first match.
      // So to fix that I created this local plugin with an additional option:
      // [matchOnlyTheFirstParagraphInTheEntireDocument] if true will exit after
      // the first paragraph match, otherwise will match all first paragraphs.
      {
        resolve: `@alexrintt/gatsby-remark-dropcap`,
        options: {
          matchOnlyTheFirstParagraphInTheEntireDocument: true,
        },
      },
      ...otherRemarkPlugins,
    ],
  },
},
```

<br>

<samp>

<h2 align="center">
  Open Source
</h2>
<p align="center">
  <sub>Copyright © 2022-present, Alex Rintt.</sub>
</p>
<p align="center">Gatsby Source GitHub Discussions <a href="https://github.com/alexrintt/gatsby-source-github-discussions/blob/master/LICENSE">is MIT licensed 💖</a></p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/51419598/194058464-f67c7fb5-9066-49b5-aa94-cf34830708ad.png" width="35" />
</p>

</samp>
