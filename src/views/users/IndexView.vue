<template>
  <div class="users">
    <h1 class="title">All users</h1>
    <div class="container">
      <button class="button is-info" @click="isModalOpen = true">
        Add a user
      </button>
      <table class="table is-hoverable is-bordered mt-4 is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address.city }}</td>
            <td>{{ user.address.country }}</td>
            <td>
              <button
                class="button is-small is-warning"
                @click="openEditUser(user)"
              >
                Edit
              </button>
              <button
                class="button is-small is-danger"
                @click="deleteUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal" :class="{ 'is-active': isModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h2>Create a user</h2>
        <UserForm @emitUser="addUser" :userToEdit="userToEdit" :editMode="isEditMode"></UserForm>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="isModalOpen = false"
      ></button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserForm from "@/components/Form/UserForm.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "IndexView",
  data: function () {
    return {
      isModalOpen: false,
      userToEdit: null,
      isEditMode: false,
    };
  },
  components: {
    UserForm,
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },
  methods: {
    ...mapActions({
      fetchUsers: "users/fetchAllUsers",
      deleteUser: "users/deleteUser",
      editUser: "users/editUser",
      createUser: "users/createUser",
    }),
    addUser(value) {
      if (!value.editMode) {
        //add the user & set the ID based on the last of the actual array
        let user = { ...value.user, id: this.users.at(-1).id + 1 };
        this.createUser(user);
      } else {
        let payload = {
          user: value.user,
          id: value.user.id,
        };
        this.editUser(payload);
      }
      this.isModalOpen = false;
    },
    
    openEditUser(user) {
      //open the modal in edit mode
      this.userToEdit = user;
      this.isEditMode = true,
      this.isModalOpen = true;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss">
a {
  color: inherit;
}
.modal-content {
  background-color: white;
  padding: 30px;
}
</style>