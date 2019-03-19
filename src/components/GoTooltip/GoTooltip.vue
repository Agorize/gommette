<script>
  import { VPopover } from 'v-tooltip'

  export default {
    ...VPopover,
    name: 'GoTooltip'
  }
</script>

<docs>
    ```html
    <div>Le composant GoTooltip fait appel à la librairie externe <a href="https://github.com/Akryum/v-tooltip">v-tooltip</a>.
        Se référer à la documentation officielle de la librairie pour consulter toutes les options
    </div>
    ```
    ```js
    <go-tooltip :delay="{ show: 500 }" :trigger="'hover'"
                offset="1"
    >
        <!-- This will be the popover target (for the events and position) -->
        <p>Hover me</p>

        <!-- This will be the content of the popover -->
        <template slot="popover">
            <p>
                Popover content
            </p>
        </template>
    </go-tooltip>
    ```
    ```js
    <go-tooltip offset="1" :placement="'top'">
        <!-- This will be the popover target (for the events and position) -->
        <button>Click me</button>

        <!-- This will be the content of the popover -->
        <template slot="popover">
            <p>
                Popover content
            </p>
        </template>
    </go-tooltip>
    ```
</docs>
