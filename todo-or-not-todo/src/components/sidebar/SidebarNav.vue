<template>

    <div v-if="shouldShowSidebar" class="sidebar" :style="{ width: computedSidebarWidth }">
      <h1>
        <span v-if="isCollapsed">
          <div class="username-first-letter">{{ usernameFirstLetter }}</div>
        </span>
        <span v-else class="username">{{ username }}</span>
      </h1>

      <SidebarLink to="/todo" icon="fas fa-home">{{ $t("home") }}</SidebarLink>
      <SidebarLink to="/about" icon="fa fa-info-circle">{{ $t("about") }}</SidebarLink>
      
      <div class="sidebar-language" @click="toggleLocale">
      <font-awesome-icon icon="earth-americas" class="icon" />
      <Transition name="fade">
      <span v-if="!isCollapsed">
        {{ $t("language") }}
      </span>
        </Transition>
      </div>

      <SidebarLink to="/login" icon="fa fa-sign-out" v-if="isLoggedIn" @click="logout" class="navbar-logout-link">
        {{ $t("logout") }}</SidebarLink>

      <span 
        class="collapse-icon"
        :class="{ 'rotate-180': isCollapsed }"
        @click="toggleSidebarMethod"
      >
        <font-awesome-icon icon="angle-double-left" />
      </span>
    </div>

    <div :style="mainContentStyle" class="main-content">
      <router-view />
    </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue';
import { globalState } from './state';
import { collapsed, toggleSidebar, SidebarWidth } from './state';


export default {
    components: { SidebarLink },
    data() {
        return {
            excludedRoutes: ['/login', '/register'],
        };
    },
    computed: {

        isLoggedIn() {
            return sessionStorage.getItem('jwtToken') !== null;
        },

        username() {
            return globalState.username;
        },
        usernameFirstLetter() {
            return this.username.charAt(0).toUpperCase();
        },
        shouldShowSidebar() {
            return !this.excludedRoutes.includes(this.$route.path);
        },
        isCollapsed() {
            return collapsed.value; 
        },
        computedSidebarWidth() {
            return SidebarWidth.value;
        },
        mainContentStyle() {
    return {
      'margin-left': this.shouldShowSidebar ? this.computedSidebarWidth : '0',
};
    },
    },
    methods: {
        getUsername(){
            return sessionStorage.getItem('username') || 'Anom'
        },
        toggleSidebarMethod() {
            toggleSidebar(); 
        },
        logout() {
            sessionStorage.removeItem('jwtToken');
            sessionStorage.removeItem('username');
            this.$router.push('/login');
        },
        toggleLocale() {
            this.currentLocale = this.currentLocale === "en" ? "sv" : "en";
            this.$i18n.locale = this.currentLocale;
    },
    },
 };

</script>

<style>
:root {
    --sidebar-bg-color: #ccc;
    --sidebar-item-hover: #e6e6e6;
    --sidebar-item-active: #e6e6e6;
}
</style>

<style scoped>

.sidebar {
    color: #018281;
    background-color:var(--sidebar-bg-color);

    float:left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding-left: 0.1em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    color:#018281;

    color: rgba(255, 255, 255 0.7);

    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}

.username,
.username-first-letter {
    padding: 5px;
    
}
.sidebar-language {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.1em 0;
    padding: 0.4em;
    border-radius: 0.25em;
    height: 1.5em;

    color: #018281;
    text-decoration: none;
}

.sidebar-language:hover {
    background-color: var(--sidebar-item-hover);
}

.sidebar-language.active {
    background-color: var(--sidebar-item-active);
}

.sidebar-language .icon {
    flex-shrink: 0;
    width: 25px;
    margin-right: 15px;
    margin-left: -5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.navbar-logout-link {
    color: #ff4d4d;
}
</style>