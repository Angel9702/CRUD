<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="2000" top>
      {{ text }}
    </v-snackbar>
    <modal
      :modaltabs="dialog"
      :usuarios2="usuario"
      :index="index"
      :identificador="id"
      @update="update"
      @close="close"
      @save="save"
    />
    <center><h1>Usuarios</h1></center>
    <v-row>
      <v-btn color="primary" style="margin-top: 10px" @click="dialog=true">
        agregar
      </v-btn>
      <v-spacer />
      <v-text-field
        v-model="buscar"
        prepend-inner-icon="mdi-magnify"
        placeholder="Buscar"
        outlined
        clearable
        @keypress.enter="buscarNomber()"
        @click:clear="limpiarBuscar()"
      />
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      disable-sort
      no-results-text="No se encontraron resultados"
      no-data-text="Aún no hay Datos"
      :items-per-page="5"
      :footer-props="{
        'items-per-page-options': rowsPerPageItems, 'items-per-page-text': 'Filas por página:',
        pageText: '{0}-{1} de {2}' }"
    >
      <template v-slot:item.fecha="{ item }">
        {{ formatFecha(item.fecha) }}
      </template>
      <template v-slot:item.acciones="{ item }">
        {{ item.acciones }}
        <v-menu lef>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn icon @click="editar(item)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn icon @click="eliminar(item)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import config from '../config'
import modal from '~/components/modalTabs'

export default {
  components: {
    modal
  },
  async asyncData () {
    try {
      const data = await axios.get(`${config.URL}usuario`)
      return { usuarios: data.data.data }
    } catch (error) {
      console.log(error, 'asyncData')
    }
  },
  data () {
    return {
      limpiar: false,
      id: '',
      buscar: '',
      snackbar: false,
      color: '',
      text: '',
      accion: false,
      index: -1,
      dialog: false,
      rowsPerPageItems: [5, 10, 15],
      retiros: ['1', '2', '3', '4'],
      genero: ['Masculino', 'Femenino'],
      headers: [
        { text: 'nombre', value: 'nombre', sortable: false },
        { text: 'apellido', value: 'apellido' },
        { text: 'DNI', value: 'dni' },
        { text: 'N° de tarjeta', value: 'tarjeta' },
        { text: 'Genero', value: 'genero' },
        { text: 'Saldo', value: 'saldo' },
        { text: 'Maximo Retiro', value: 'maxRetiro' },
        { text: 'Intentos', value: 'intentos' },
        { text: 'fecha de creado', value: 'fecha' },
        { text: 'Acciones', value: 'acciones' }
      ],
      usuarios: [],
      usuario: {
        nombre: '',
        apellido: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
      },
      progreso: false
    }
  },
  methods: {
    async buscarNomber () {
      console.log('guardar')
      console.log(this.buscar)
      try {
        const data = await axios.get(`${config.URL}usuarioBuscar`, { params: { queryNombre: this.buscar } })
        if (this.buscar === '') {
          this.limpiarBuscar()
        } else {
          this.usuarios = data.data.data
        }
        console.log(data, 'buscar')
      } catch (error) {
        console.log(error, 'error')
      }
    },
    // async
    async limpiarBuscar () {
      console.log('limpiar')
      try {
        const data = await axios.get(`${config.URL}usuario`)
        console.log(data, 'limpiar')
        this.usuarios = data.data.data
      } catch (error) {
        console.log(error, 'asyncData')
      }
    },
    abrirDialogo () {
      this.progreso = true
      this.dialog = true
    },
    save (item) {
      this.usuarios.push(item)
      this.close()
    },
    update (value) {
      Object.assign(this.usuarios[this.index], value)
    },
    editar (item) {
      this.dialog = true
      this.index = this.usuarios.indexOf(item)
      this.usuario = Object.assign({}, item)
      this.id = item._id
      console.log(this.id, 'page')
      console.log(this.index)
    },
    formatFecha (value) {
      const date = new Date(value)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      if (month < 10) {
        // console.log(`${day}-0${month}-${year}`)
        return `${day}-0${month}-${year}`
      } else {
        // console.log(`${day}-${month}-${year}`)
        return `${day}-${month}-${year}`
      }
    },
    editarestado (item) {
      console.log(item.nombre)
    },
    eliminar (item) {
      // const self = this
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: 'Esta acción no podrá ser revertida',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'primary',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            'El campo ha sido eliminado correctamente.',
            'success'
          )
          console.log(item._id)
          const self = this
          try {
            const data = await axios.delete(`${config.URL}usuario/${item._id}`)
            self.index = self.usuarios.indexOf(item)
            console.log(self.index)
            self.usuarios.splice(self.index, 1)
            console.log(data)
            console.log(item._id)
            this.index = -1
          } catch (error) {
            console.log(error, 'delete')
          }
        }
      })
    },
    close (value) {
      console.log(value, 'salir')
      this.id = ''
      this.index = -1
      this.dialog = value
      this.usuario = {
        nombre: '',
        apellido: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
      }
    },
    mensaje (snackbar, color, text) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
    }
  }
}
</script>
