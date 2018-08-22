# \<speech-to-text\>

polymer wrapper for the web speech api

<!---
```
<custom-element-demo>
  <template>
    <script type="module" src="./speech-to-text.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
  <speech-to-text></speech-to-text>
```


## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing The Element

```
$ polymer serve
```

## Configuration and Use

start recording speech one of two ways:

1) add an attribute to the element 'recording'
from:
```
<speech-to-text>
```
to:
```
<speech-to-text recording>
```

2) or use the built in buttons

access results in one of two ways:

1) read the attributes after recording speech
```
<speech-to-text interim='this is a result' final='this is a result'>
```
2) read the result from the built in display

NOTE: the built in buttons and displays are by default hidden to use them set the following visibility variables
```
<style>
    --start-recording-visibility: visible;
    --stop-recording-visibility: visible;
    --interim-results-visibility: visible;
    --final-results-visibility: visible;
</style>
```
