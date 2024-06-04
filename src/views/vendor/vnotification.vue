<template>

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            username
                        </th>
                        <th scope="col" class="px-6 py-3">
                            massage
                        </th>
                        <th scope="col" class="px-6 py-3">
                            time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="bg-white  " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{user.name}}
                        </th>
                        <td class="px-6 py-4">
                            {{user.massage}}
                        </td>
                        <td class="px-6 py-4">
                            {{user.time}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            users:[
                {
                    name:'Ahmed',
                    massage:'new user rigester',
                    time:'1 houre ago'
                }
            ],
        }
    }
        
    }
</script>

<style lang="scss" scoped>

</style>