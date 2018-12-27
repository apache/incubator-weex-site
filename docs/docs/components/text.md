# &lt;text&gt;

## Summary

The weex builtin component 'text' is used to render text with specified style rule.

> **Note:** This component supports no child components.

> **Note:** The heading and trailing white space will be ignored. If this is not what you need, you can set text using the data-binding method above.

## Styles
* Support [common styles for components](../styles/common-styles.html)
* Support [text style](../styles/text-styles.html)

## Attributes
Except for dynamic text, there is no other supported attributes for text.
### dynamic text
One can use the following code snippet to bind the content of text to a variable

      <template>
        <div>
          <text >{{content}}</text>
        </div>
      </template>
      <script>
        module.exports = {
          data: function(){
            return {
                content: "Weex is an cross-platform development solution that builds high-performance, scalable native applications with a Web development experience. Vue is a lightweight and powerful progressive front-end framework. "
            }
          }
      }
      </script>

## Events
Support [common events](../events/common-events.html)

## Other
### The magic of text height
The rules for computed height of text component is complicated, basically but not always, text in weex obey the following rules in order:
1. The CSS style of `max-height`/`min-height` on your text
2. The CSS style of `flex` on your text if there is a `flex-direction:column` on the parent component of you text.
3. The CSS style of `height` on your text
4. The CSS style of `align-items:stretch` on your text if there is a `flex-direction:row` on the parent you text.
5. The content of your text and [text style](../styles/text-styles.html) on your text.
6. Other related CSS style not mentioned here.

### Custom Typeface
`support:v0.12.0`

support loading custom font of `ttf` and `woff` format. Call [addRule](../modules/custom_font.html) in dom module to build your own `font-family`, we suggest that you call `addRule` in `beforeCreate`.

## Examples
* [Basic usage for `<text>`](http://dotwe.org/vue/7d2bf6e112ea26984fd5930663f092e0).
