# query-store

query-store gives you a writable svelte store that syncs with the browser's search params. Makes for easy bookmarking and sharing of UI state.

### Usage

```html
<script>
import query from 'query-store'
</script>

<input bind:value={$query.someparam}>
```

And that's all there is to it.

### Todo

 - [ ] Figure out how to do this with SSR