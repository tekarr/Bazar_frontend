<template>
    <div>
        <input type="text" v-model="searchTerm" placeholder="Search..." />
        
        <ul>
        <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
    </template>

    <script>
    export default {
    data() {
        return {
        searchTerm: '',
        items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            // ...more items
        ]
        };
    },
    computed: {
        filteredItems() {
        return this.items.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
    }
    };                      
</script>