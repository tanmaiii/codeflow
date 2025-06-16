import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

// Xin tất cả quyền
provider.addScope('repo');
provider.addScope('repo:org');
provider.addScope('delete_repo');
provider.addScope('admin:org');
provider.addScope('write:repo_hook');
provider.addScope('workflow');
provider.addScope('write:packages');
provider.addScope('read:packages');
provider.addScope('user:email');

export { app, auth, provider };
