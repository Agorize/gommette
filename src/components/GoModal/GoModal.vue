<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="go-modal">
    <modal v-model="modalOpen" @hide="onClose" ref="modal" :size="modalSize" :header="false" :footer="false">
      <slot name="header">
        <div class="close m-md" @click="onClose">
          <go-icon :name="'close'"></go-icon>
        </div>
      </slot>
      <div class="row">
        <div class="col-xs-12 col-sm-10 col-sm-offset-1">
          <div class="modal-body m-t-md m-b-xl">
            <div class="modal-section">
              <div class="container-fluid">
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import * as uiv from 'uiv'

Vue.use(uiv)

export default {
  name: 'GoModal',
  props: {
    /**
     * Is a boolean, corresponds to the state of the modal.
     */
    modalOpen: {
      type: Boolean,
      default: false,
      required: true
    },
    /**
     * Is a string, can be used to set a modal size.
     */
    modalSize: {
      type: String,
      default: 'lg'
    }
  },
  methods: {
    onClose () {
      this.modalOpen = false
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss">

</style>

<docs>
  ```js
  let modalOpen = false
  let askFormDisplayed = false

   <div>
    <button @click="modalOpen=true">OPEN</button>
    <go-modal :modal-open="modalOpen" @onClose="modalOpen = false" :modalSize="'sm'" >
      <template slot="content">
        <transition name="component-fade" mode="out-in">
          <div key=1 v-if="!askFormDisplayed" class="text-center">
            <h4>Vous avez une question ?</h4>
            <go-icon :name="'help-center icn-xxl'"></go-icon>
            <p>Trouvez une réponse sur notre Success Center qui recense de nombreux articles répondant aux questions les plus fréquentes.</p>
            <a class="btn btn-primary btn-sm m-t-md m-b-md" target="_blank" href="https://success.agorize.com">Accéder au Success Center</a>
            <button class="text-primary m-b-md" @click="askFormDisplayed = true">Vous n'avez pas trouvé de réponse ?</button>
          </div>

          <div key=2 v-else class="text-center">
            <h4>Posez-nous votre question</h4>
            <div>
              <h1>INSERT FORM HERE</h1>
            </div>
          </div>
        </transition>
      </template>
    </go-modal>
  </div>
  ````
</docs>
