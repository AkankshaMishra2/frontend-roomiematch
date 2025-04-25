import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';

// Define the shape of the AuthContext
interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  authError: string | null;
  signup: (email: string, password: string, displayName: string) => Promise<FirebaseUser>;
  signin: (email: string, password: string) => Promise<FirebaseUser>;
  signout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        try {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUser({
              ...user,
              ...userDoc.data(),
            });
          } else {
            setUser(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, displayName: string) => {
    setAuthError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(user, { displayName });
      
      // Create user document in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email,
        displayName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return user;
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const signin = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const signout = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const updateUserProfile = async (data: { displayName?: string }) => {
    setAuthError(null);
    try {
      const currentUser = auth.currentUser;
      
      if (currentUser && data.displayName) {
        await updateProfile(currentUser, { displayName: data.displayName });
      }
      
      // Update Firestore document
      if (currentUser) {
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        await setDoc(userDocRef, {
          ...data,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
      
      // Update local state
      if (user) {
        setUser({
          ...user,
          ...data,
        });
      }
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    authError,
    signup,
    signin,
    signout,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};