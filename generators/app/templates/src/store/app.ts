import { create } from 'zustand';

import { getToken, setToken } from '@/helpers/storage';

type TAppStore = {
  token: string | undefined | null;
  loading: boolean;
  setToken: (token: string | undefined | null) => void;
  currentUser: { id: string; name: string } | undefined;
  init: () => void;
  reset: () => void;
};

/**
 * 全局状态，整个 App 运行期间共享
 */
const useAppStore = create<TAppStore>((set, get) => ({
  token: getToken() ?? '',
  setToken: (token: string | undefined | null) => {
    setToken(token ?? '');
    set({ token });
  },
  currentUser: undefined,
  loading: false,
  init: () => {
    const store = get();
    if (store.loading || store.currentUser) {
      return;
    }

    set({ loading: true });

    new Promise<{ data: TAppStore['currentUser']; code: number }>((resolve) => {
      setTimeout(() => {
        resolve({ data: { id: '1', name: '哈哈' }, code: 200 });
      }, 1000);
    })
      .then((res) => {
        if (res?.code === 200) {
          set({ currentUser: res?.data });
        }
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  reset: () => {
    const token = '';
    setToken(token);
    set({ token, currentUser: undefined, loading: false });
  }
}));

export default useAppStore;
