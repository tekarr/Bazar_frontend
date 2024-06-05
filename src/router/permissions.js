import state from '../store/index';
import {mapGetters} from "vuex";
mapGetters('auth', ['user']);

import store from '../store';
import auth from "@/store/auth";

const hasRole = (roles) => (to, from, next) => {
    store.dispatch("auth/checkAuth").then(() => {
        // const userRole = store.state.auth.user.role_id;
        const userRole = store.state.auth.user.role_id;
        if (!roles.includes(userRole)) {

            next('/');
            console.log('Unauthorized');
        } else {

            next();
        }
    }).catch((err) => {
            console.log("hasRole error: ", err);
            next('/');
        }
    );
}

export { hasRole }