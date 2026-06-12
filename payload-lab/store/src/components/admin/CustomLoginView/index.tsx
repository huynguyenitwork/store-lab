

import { LoginView as DefaultLoginView } from '@payloadcms/next/views'
import type { AdminViewServerProps } from 'payload'
import React from 'react'

export const CustomLoginView: React.FC<AdminViewServerProps> = (props) => {
  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>🛍️ Welcome Back</h1>
      <DefaultLoginView {...props} />
      <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
        Chưa có tài khoản? Liên hệ <a href="mailto:admin@mystore.com">admin@mystore.com</a>
      </p>
    </div>
  )
}