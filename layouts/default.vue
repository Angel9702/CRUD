<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dark
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    > -->
    <!-- <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon> -->
    <!-- </v-list-item-action>
      <v-list-item-title>Switch drawer (click me)</v-list-item-title> -->
    <!-- </v-list-item> -->
    <!-- </v-list> -->
    <!-- </v-navigation-drawer> -->
    <v-footer
      dark
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-plus',
          title: 'tabla de multiplicar',
          to: '/inspire'
        },
        {
          icon: 'mdi-cash',
          title: 'Cajero Automatico',
          to: '/puerba'
        },
        {
          icon: 'mdi-account',
          title: 'Usuarios',
          to: '/CrudCajero'
        },
        {
          icon: 'mdi-cat',
          title: 'Pruebas',
          to: '/cajero'
        },
        {
          icon: 'mdi-dog',
          title: 'Otros',
          to: '/prueba2'
        },
        {
          icon: 'mdi-phone',
          title: 'whatsapp',
          to: '/whatsapp'
        },
        {
          icon: 'mdi-pokemon',
          title: 'pokemon',
          to: '/d'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ':v'
    }
  }
}
</script>
