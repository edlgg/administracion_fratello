<template>
  <div>
    <div v-if="user">
      <v-btn color="primary" @click="logOut">Log out</v-btn>
      <v-btn
        v-if="user.includes('admin')"
        color="secondary"
        @click="config = !config"
        >Config</v-btn
      >
      <div v-if="!config">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <div class="text-center">
              <vuetify-logo />
            </div>
            <div v-if="!cosa">
              <v-card
                v-for="comunidad in comunidades"
                :key="comunidad.nombre"
                style="margin-bottom: 30px"
              >
                <v-card-title class="headline">
                  {{ comunidad.nombre }}</v-card-title
                >
                <v-img :src="comunidad.src" height="200px"></v-img>
                <v-card-text>
                  <p>Estado: {{ comunidad.estado }}</p>
                  <p>Número de habiantes: {{ comunidad.habitantes }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="toggle(comunidad.nombre)" color="primary">
                    Ver Más
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
            <div v-if="cosa">
              <v-btn @click="toggle(cosa.nombre)" color="primary">
                Regresar
              </v-btn>
              <v-card
                v-for="cosa in cositas"
                :key="cosa.nombre"
                style="margin-bottom: 30px"
              >
                <v-card-title class="headline"> {{ cosa.nombre }}</v-card-title>
                <v-img :src="cosa.src" height="200px"></v-img>
                <v-card-text>
                  <p v-if="cosa.tipo == 'evento'">Nombre: {{ cosa.nombre }}</p>
                  <p v-if="cosa.tipo == 'evento'">Fecha: {{ cosa.fecha }}</p>
                  <p v-if="cosa.tipo == 'evento'">
                    Descripcion: {{ cosa.descripcion }}
                  </p>
                  <p v-if="cosa.tipo == 'casa'">
                    Direccion: {{ cosa.direccion }}
                  </p>
                  <p v-if="cosa.tipo == 'casa'">
                    Habitantes: {{ cosa.habitantes }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-if="config"><config /></div>
    </div>

    <div v-if="!user">
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
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Config from '~/components/Config.vue'

export default {
  setup() {},
  data() {
    return {
      comunidades: [],
      comunidad: '',
      cosas: [],
      cosa: false,
      user: '',
      email: '',
      password: '',
      config: false,
    }
  },
  components: {
    VuetifyLogo,
    Config,
  },
  computed: {
    cositas() {
      return this.cosas.filter((word) => word.comunidad === this.comunidad)
    },
  },
  async mounted() {
    await this.getMunicipios()
    await this.getCosas()
  },
  methods: {
    toggle(nombre) {
      console.log('nombreee', nombre)
      this.cosa = !this.cosa
      this.comunidad = nombre
    },
    async getMunicipios() {
      const snapshot = await this.$fire.firestore.collection('comunidad').get()
      const docs = snapshot.docs
      const comunidades = []
      for (let i = 0; i < docs.length; i++) {
        const plan = docs[i].data()
        comunidades.push(plan)
      }
      this.comunidades = comunidades
      // console.log(municipios)
    },
    async getCosas() {
      const snapshot = await this.$fire.firestore.collection('cosa').get()
      const docs = snapshot.docs
      const cosas = []
      for (let i = 0; i < docs.length; i++) {
        const plan = docs[i].data()
        cosas.push(plan)
      }
      this.cosas = cosas
      console.log(cosas)
    },
    async login() {
      await this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      )

      const user = this.$fire.auth.currentUser
      this.user = user.email

      const _this = this
      if (user) {
        _this.$router.push({
          path: '/',
        })
      }
    },
    async logOut(click) {
      await this.$fire.auth.signOut()
      this.user = null
    },
  },
}
</script>
