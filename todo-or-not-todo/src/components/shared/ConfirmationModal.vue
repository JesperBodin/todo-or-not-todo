<template>
  <div v-if="openClose" class="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true"
    role="dialog" style="display: block;">
    <div class="dialog">
      <div class="content">
        <div class="header">
          <h5 class="title">{{ title }}</h5>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="footer">
          <button type="button" class="btn-cancel" @click="cancel">{{ cancelButtonLabel }}</button>
          <button type="button" class="btn-confirm" @click="confirm">{{ confirmButtonLabel }}</button>
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 500px;
  background-color: #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.header, .footer {
  width: 100%; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 10px 0; 
}

.body {
  width: 100%;
  margin: 10px 0; 
  text-align: center; 
}

.title {
  margin: 0;
}

.btn-confirm, .btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
}

.btn-confirm {
  background-color: #ff4d4d;
  color:#333;
}

.btn-cancel {
  padding: 10px 25px;
  background-color: #f5f5f5;
  color: #333;
}

.btn-confirm:hover {
  background-color: #ff3333;
}

.btn-cancel:hover {
  background-color: #e6e6e6;
}
</style>