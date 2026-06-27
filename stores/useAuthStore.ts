import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { supabase } from "@/lib/supabase";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  profileImage?: boolean;
};

/**
 * @description this function - create
 * a new type data user useAuthStore(name example)
 * @returns {object}
 */
export const useAuthStore = create<AuthStore>()(
  // save state
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            // login with password
            email,
            password,
          });

          if (error) {
            console.log("LOGIN ERROR:", error);
            throw error;
          }

          if (data && data.user && !error) {
            const { user } = data;

            const newUser: User = {
              id: user.id,
              email: user.email!,
              username: user.user_metadata.username,
            };

            set({
              user: newUser,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          throw error;
        }
      },
      register: async (email: string, password: string, username: string) => {
        // check append user in store
        try {
          // passing on the information
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username,
              },
            },
          });

          if (error) {
            console.log("REGISTER ERROR:", error);
            throw error;
          }

          if (data && data.user && !error) {
            const { user } = data;
            /**
             * @description this function create
             * object user and save in data supabase
             * @returns {object}
             */
            const newUser: User = {
              id: user.id,
              email: user.email!,
              username: user.user_metadata.username,
            };

            set({
              user: newUser,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          throw error;
        }
      },
      logout: async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage), // save data on user device
    },
  ),
);
