<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline"> La Rosita </v-card-title>
        <v-card-text>
          <p>Municipio: El Municipio</p>
          <p>Estado: Nuevo Leon</p>
          <p>Número de habiantes: 42</p>
          <div class="text-xs-right">
            <em><small>&mdash; Miguel Cruz</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Ver Más </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import { ref } from 'vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  setup() {},
  components: {
    VuetifyLogo,
  },
}
</script>
