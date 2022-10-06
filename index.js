const visit = require("unist-util-visit");
const { EXIT } = require("unist-util-visit");

module.exports = ({ markdownAST }, pluginOptions) => {
  const dropcapClass =
    pluginOptions && "dropcapClass" in pluginOptions
      ? pluginOptions.dropcapClass
      : "dropcap";
  const invisibleClass =
    pluginOptions && "invisibleClass" in pluginOptions
      ? pluginOptions.invisibleClass
      : "invisible";
  const matchOnlyTheFirstParagraphInTheEntireDocument =
    pluginOptions &&
    "matchOnlyTheFirstParagraphInTheEntireDocument" in pluginOptions
      ? pluginOptions.matchOnlyTheFirstParagraphInTheEntireDocument
      : false;

  function visitor(node, index) {
    if (
      index > 1 ||
      !("children" in node) ||
      node.children.length <= 0 ||
      !("value" in node.children[0])
    ) {
      return;
    }
    const para = node.children[0].value;
    const word = para.split(" ")[0];
    const letter = word.charAt(0);
    const part = word.substr(1);
    const text = para.substr(word.length);

    // remove first word from text
    node.children[0].value = text;

    // replace what was first word with accessible dropcapped markup
    node.children.unshift(
      {
        type: "emphasis",
        children: [
          {
            type: "emphasis",
            children: [
              {
                type: "text",
                value: letter,
              },
            ],
            data: {
              hName: "span",
              hProperties: { className: dropcapClass },
            },
          },
          {
            type: "text",
            value: part,
          },
        ],
        data: {
          hName: "span",
          hProperties: { ariaHidden: "true" },
        },
      },
      {
        type: "emphasis",
        children: [
          {
            type: "text",
            value: word,
          },
        ],
        data: {
          hName: "span",
          hProperties: { className: invisibleClass },
        },
      }
    );

    if (matchOnlyTheFirstParagraphInTheEntireDocument) {
      // Stop here, we already found a paragraph. Ignore all other ones in this document.
      return [EXIT];
    }
  }

  visit(markdownAST, "paragraph", visitor);

  return markdownAST;
};
