<template>
  <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true"
    role="dialog" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title mx-auto">{{ title }}</h5>
        </div>
        <div class="modal-body text-center">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">{{ cancelButtonLabel }}</button>
          <button type="button" class="btn btn-primary btn-danger" @click="confirm">{{ confirmButtonLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPopup',

  props: {
    visible: Boolean,
    title: String,

    cancelButtonLabel: {
      type: String,
      default: 'CANCEL',
    },

    confirmButtonLabel: {
      type: String,
      default: 'REMOVE',
    },
  },

  data() {
    return {
      openClose: this.visible,
    };
  },

  methods: {
    toggleModal() {
      this.openClose = !this.openClose;
    },

    confirm() {
      this.toggleModal();
      this.$emit('confirm');
    },

    cancel() {
      this.toggleModal();
      this.$emit('cancel');
    },
  },
  
  watch: {
    visible: function (newVal) {
      this.openClose = newVal;
    },
  },
};
</script>

<style scoped>
</style>