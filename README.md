# query-store

query-store gives you a writable svelte store that syncs with the browser's search params. Makes for easy bookmarking and sharing of UI state.

## Usage

```html
<script>
import query from 'query-store'
</script>

<input bind:value={$query.someparam}>
```

![demo](https://i.imgur.com/zhm9IkY.gif)

And that's all there is to it.

### Sapper / SSR

To make this work with Sapper, manually initialize the store server-side like this:

```html
<script context="module">
import query from 'query-store'

export function preload(page) {
  query.set(page.query)
}
</script>

<input bind:value={$query.param}>
```

### History Navigation

To create a history entry on each query change (using pushState instead of replaceState), add the param name that you want to track to the `navigatable` array.

```html
<script>
import query from 'query-store'
query.navigatable.push('tab')
</script>

<a class="tab" on:click={() => $query.tab = 'home'}>
```
