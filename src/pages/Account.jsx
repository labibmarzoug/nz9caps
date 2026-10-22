import { useState } from 'react'
import { useStore } from '../context/StoreContext'

export default function Account() {
  const { setToast } = useStore()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit(e) {
    e.preventDefault()
    localStorage.setItem('nz9-account', JSON.stringify({ email }))
    setToast(mode === 'login' ? 'Session locale ouverte.' : 'Compte créé localement.')
  }

  return (
    <div className="page">
      <div className="wrap page-hero">
        <span className="kicker">Account</span>
        <h1>{mode === 'login' ? 'Login.' : 'Create.'}</h1>
      </div>
      <div className="wrap" style={{ maxWidth: 520, paddingBottom: 80 }}>
        <form className="form-card glass" onSubmit={submit}>
          <label className="field">
            <span>Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="field">
            <span>Password</span>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Compte local pour suivre tes commandes COD. Livraison gratuite 24h–48h Maroc.
          </p>
          <button className="btn full" type="submit">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
          <button type="button" className="btn-line full" style={{ marginTop: 10 }} onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Create account' : 'Back to login'}
          </button>
        </form>
      </div>
    </div>
  )
}
