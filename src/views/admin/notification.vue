<template>
        <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-3xl overflow-hidden">
            <thead class="text-xs  text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3 ">
                {{ $t('Message') }}
                </th>
                <th scope="col" class="px-6 py-3 ">
                {{ $t('Time') }}
                </th>
                <!-- <th scope="col" class="px-6 py-3">
                Status
                </th> -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="notification in notifications" :key="notification.id" class="bg-white  cursor-pointer hover:text-pink-500" @click="handleClick(notification)">
                <td class="px-6 py-4">
                {{ notification.data.body }}
                </td>
                <td class="px-1 py-4 text-pink-500">
                {{ notification.created_at }}
                </td>
                <!-- <td class="px-6 py-4 text-pink-600">
                {{ notification.read_at }}
                </td> -->
            </tr>
            </tbody>
        </table>
        </div>
</template>

<script>
import Sidbar from '@/components/admin/Sidbar.vue'
import Navbar from '@/components/admin/navbar.vue'
import axiosClient from '@/axios';
import {mapState} from "vuex";

    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            // notifications: [],
            unread:''
        }
    },
      computed: {
        ...mapState('admin', ['notifications']),
      },
    async created() {
   this.$store.dispatch('admin/getNotifications');
    }, 
    methods: {
    handleClick(notification) {
         // Extract the resource part from the URL
        const urlParts = notification.data.url.split('/');
        const resource = urlParts[1];

        // Construct the new URL with the admin prefix
      const url = `/admin/${resource}`;
        this.$router.push(url);
        }
    },
      mounted() {
      }

        
    }
</script>

<style lang="scss" scoped>

</style>