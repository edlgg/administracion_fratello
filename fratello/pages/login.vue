<template>
  <v-row>
    <v-col class="text-center">
      <vuetify-logo style="width: 60%" />
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title class="headline">Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              name="email"
              prepend-icon="mdi-account"
              type="email"
            ></v-text-field>

            <v-text-field
              id="password"
              v-model="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="login">Login</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'logged_out',
  components: {
    VuetifyLogo,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      await this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      )

      const user = this.$fire.auth.currentUser

      const _this = this
      if (user) {
        _this.$router.push({
          path: '/',
        })
      }
    },
  },
}
</script>
