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


### History Navigation

To create a history entry on each query change (using pushState instead of replaceState), call `keepHistory` with the name of the param.

```html
<script>
import query from 'query-store'
query.keepHistory('seed')
</script>

Current seed is {$query.seed}
<button on:click={() => $query.seed = Math.random()}>Generate new seed</button>
```

### Integrate with routers

If you use a router that has its own handling of query parameters (eg Sapper's `$page.query`), you can sync them up like this:

```html
<script>
import query from 'query-store'
import { stores } from '@sapper/app'

const { page } = stores()
$: query.setWithoutHistory($page.query)
</script>

Current tab is {$query.tab}

<a href="{$page.path}?tab=general">Home</a>
<a href="{$page.path}?tab=details">Details</a>
<a href="{$page.path}?tab=edit">Edit</a>
```

Even though Sapper's $page store is read-only, this way you can directly assign values to the $query store.