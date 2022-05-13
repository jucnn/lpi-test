<template>
  <form>
    <div class="field">
      <label class="label">Firstname</label>
      <div class="control">
        <input
          id="firstname"
          v-model="user.firstname"
          class="input"
          type="text"
          placeholder="Lea"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Lastname</label>
      <div class="control">
        <input
          id="lastname"
          v-model="user.lastname"
          class="input"
          type="text"
          placeholder="Martin"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          id="email"
          v-model="user.email"
          class="input"
          type="email"
          placeholder="lea.martin@gmail.com"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">City</label>
      <div class="control">
        <input
          id="city"
          v-model="user.address.city"
          class="input"
          type="text"
          placeholder="Paris"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Country</label>
      <div class="control">
        <input
          id="country"
          v-model="user.address.country"
          class="input"
          type="text"
          placeholder="France"
        />
      </div>
    </div>
    <button class="button is-primary" @click.prevent="emitUser()">
      {{ editMode ? "Validate" : "Create" }}
    </button>
  </form>
</template>
<script>
export default {
  name: "CreateView",
  props: {
    userToEdit: Object,
    editMode: { type: Boolean, default: false },
  },
  data: function () {
    return {
      user: {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        address: {
          city: "",
          country: "",
        },
      },
    };
  },
  watch: {
    userToEdit(user) {
      if (user != null) {
        this.user = {
          id: this.userToEdit.id,
          firstname: this.userToEdit.firstname,
          lastname: this.userToEdit.lastname,
          email: this.userToEdit.email,
          address: {
            city: this.userToEdit.address.city,
            country: this.userToEdit.address.country,
          },
        };
      }
    },
  },
  methods: {
    emitUser() {
      this.$emit("emitUser", { user: this.user, editMode: this.editMode });
      this.user = {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        address: {
          city: "",
          country: "",
        },
      };
    },
  },
};
</script>