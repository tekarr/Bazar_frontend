<template>

    <navbarr/>

    <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12 mt-40">
        
        <form @submit.prevent="Submit">
            <div class="flex flex-wrap -mx-3 mb-6">
                
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="first-name">
                        First Name
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="first-name" type="text" v-model="profile.firstName" />
                </div>

                <div class="w-full md:w-1/2 px-3">
                    <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="last-name">
                        Last Name
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="last-name" type="text" v-model="profile.lastName" />
                </div>

            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="email" type="email" v-model="profile.email" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="bio">
                        Bio
                    </label>
                    <textarea
                        class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="bio" v-model="profile.bio"></textarea>
                </div>
            </div>

            <button class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-2xl" type="submit">
                Save Profile
            </button>
        </form>
    </div>
</template>

<script>
import Navbarr from '@/components/customer/Navbarr.vue'
export default {
    components: { Navbarr },
    data() {
        return {
            profile: {
                firstName: '',
                lastName: '',
                email: '',
                bio: ''
            }
        }
    },
    methods: {
        Submit() {
            // Handle form submission logic here
            console.log(this.profile)
        }
    }
}
</script>