
const hasRole = (roles) => (to, from, next) => {
    const userRole = localStorage.getItem('role');
    if (!roles.includes(parseInt(userRole))) {
        next('/');
    } else {
        next();
    }
};

export { hasRole };