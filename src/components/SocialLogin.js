import React from 'react'
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

function SocialLogin({ onGoogleLogin, onFacebookLogin }) {
  return (
   <>
    <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
      <p style={{ marginBottom: '1rem', fontWeight: '600', color: '#555' }}>Continue with</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <div
          onClick={onGoogleLogin}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#db4437',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease',
          }}
          title="Login with Google"
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaGoogle />
        </div>

        <div
          onClick={onFacebookLogin}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#3b5998',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease',
          }}
          title="Login with Facebook"
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaFacebookF />
        </div>
      </div>
    </div>
  
   </>
  )
}

export default SocialLogin