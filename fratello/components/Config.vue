<template>
  <div style="margin-left: 30%; margin-right: 30%; margin-top: 3%">
    <h1>Agregar nuevos</h1>
    <h2>Agregar Comunidad</h2>
    <v-text-field v-model="comunidad.estado" label="estado"></v-text-field>
    <v-text-field
      v-model="comunidad.habitantes"
      label="habitantes"
    ></v-text-field>
    <v-text-field v-model="comunidad.nombre" label="nombre"></v-text-field>
    <v-text-field v-model="comunidad.src" label="src"></v-text-field>
    <v-btn color="primary" @click="add_comunidad">Agregar</v-btn>
    <p>---</p>

    <h2>Agregar Evento</h2>
    <v-text-field v-model="evento.comunidad" label="comunidad"></v-text-field>
    <v-text-field
      v-model="evento.descripcion"
      label="descripcion"
    ></v-text-field>
    <v-text-field v-model="evento.direccion" label="direccion"></v-text-field>
    <v-text-field v-model="evento.habitantes" label="habitantes"></v-text-field>
    <v-text-field v-model="evento.fecha" label="fecha"></v-text-field>
    <v-text-field v-model="evento.nombre" label="nombre"></v-text-field>
    <v-text-field v-model="evento.src" label="src"></v-text-field>
    <v-text-field
      v-model="evento.tipo"
      label="tipo (evento o casa)"
    ></v-text-field>
    <v-btn color="primary" @click="add_cosa">Agregar</v-btn>
    <p>--</p>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      comunidad: { nombre: '', estado: '', habitantes: '', src: '' },
      evento: {
        nombre: '',
        comunidad: '',
        descripcion: '',
        direccion: '',
        habitantes: '',
        fecha: '',
        src: '',
      },
    }
  },
  methods: {
    async add_comunidad() {
      const resp = await this.$fire.firestore
        .collection('comunidad')
        .add(this.comunidad)
      console.log(resp)
    },
    async add_cosa() {
      const resp = await this.$fire.firestore
        .collection('cosa')
        .add(this.evento)
      console.log(resp)
    },
  },
}
</script>

<style>
.VuetifyLogo {
  width: 60%;
}
</style>
