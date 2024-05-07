import { ref, computed, reactive } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 180;
export const SIDEBAR_WIDTH_COLLAPSED = 38;
export const SidebarWidth = computed(
    () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)

export const globalState = reactive({
    username: sessionStorage.getItem('username') || 'Anom'
  });
  
  export function setUsername(newUsername) {
    globalState.username = newUsername;
    sessionStorage.setItem('username', newUsername);
  }
  
  export function clearUsername() {
    globalState.username = 'Anom';
    sessionStorage.removeItem('username');
  }