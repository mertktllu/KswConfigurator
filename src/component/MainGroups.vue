<template>
    <div>
      <h1>Main Groups</h1>
      <ul>
        <li v-for="mainGroup in mainGroups" :key="mainGroup.MainGroupID">
          {{ mainGroup.Name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  // Axios veya Fetch gibi HTTP istemci kütüphanelerini burada içe aktarın
  import axios from 'axios'; // Örneğin, Axios kullanıyoruz
  
  export default {
    data() {
      return {
        mainGroups: [] // Ana grup verilerini saklamak için boş bir dizi
      };
    },
    mounted() {
      // Sayfa yüklendiğinde ana grup verilerini almak için API isteği gönderin
      this.fetchMainGroups();
    },
    methods: {
      async fetchMainGroups() {
        try {
          // Ana grup verilerini sunucudan almak için Axios veya Fetch kullanın
          const response = await axios.get('/main-groups');
          // Gelen veriyi bileşenin veri alanına atayın
          this.mainGroups = response.data;
        } catch (error) {
          console.error('Error fetching main groups:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Gerekirse bileşeninizin CSS stillerini burada tanımlayabilirsiniz */
  </style>
  