import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import ChatRoom from '../views/ChatRoom.vue';
import useValidate from '../auth/validate';

const { error, validate } = useValidate();

const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid');
  const client = window.localStorage.getItem('client');
  const accessToken = window.localStorage.getItem('access-token');

  if (!uid || !client || !accessToken) {
    console.log('ログインしていません');
    next({ name: 'WelcomeView' });
    return;
  }

  await validate();

  if (error.value) {
    console.log('認証に失敗しました');
    next({ name: 'WelcomeView' });
  } else {
    next();
  }
};

const noRequireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid');
  const client = window.localStorage.getItem('client');
  const accessToken = window.localStorage.getItem('access-token');

  if (!uid && !client && !accessToken) {
    next();
    return;
  }

  await validate();

  if (!error.value) {
    next({ name: 'Chatroom' });
  } else {
    next();
  }
};

// ルートの定義
const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView,
    beforeEnter: noRequireAuth,
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: ChatRoom,
    beforeEnter: requireAuth,
  },
];

// Vue Router のインスタンスを作成
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;