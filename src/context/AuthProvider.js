import { createContext, useContext, useEffect, useState } from 'react'

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'

import { app, allAuth, db } from '../firebase/firebase'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [post, setPost] = useState({ writer: '', msg: '' })
  const [posts, setPosts] = useState([])

  const [auth, setAuth] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const createMsg = async (post) => {
    await addDoc(collection(db, 'chat'), {
      ...post,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'chat'), (snap) => {
      const arr = []
      snap.docs.forEach((doc) => arr.push(doc.data()))
      const arr2 = arr.sort(function (a, b) {
        return a.timestamp?.seconds - b.timestamp?.seconds
      })
      setPosts(arr2)
    })

    return () => {
      unsub()
    }
  }, [])

  const createUserWithEmailAndPassword = (email, password) => {
    const AUTH_APP = allAuth.getAuth(app)

    return allAuth
      .createUserWithEmailAndPassword(AUTH_APP, email, password)
      .then((userCredential) => {
        setAuth(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signInWithEmailAndPassword = (email, password) => {
    const AUTH_APP = allAuth.getAuth(app)

    return allAuth
      .signInWithEmailAndPassword(AUTH_APP, email, password)
      .then((userCredential) => {
        setAuth(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signOut = () => {
    const AUTH_APP = allAuth.getAuth(app)

    return allAuth
      .signOut(AUTH_APP)
      .then(() => {
        console.log('signout')
        setAuth(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    const AUTH_APP = allAuth.getAuth(app)
    const unsubscribe = allAuth.onAuthStateChanged(AUTH_APP, (user) => {
      if (user) {
        setAuth(user)
        setIsAuthenticating(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthenticating,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        post,
        setPost,
        posts,
        setPosts,
        createMsg,
        // getAllMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
