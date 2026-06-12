import React from 'react'
console.log("-----------")
console.log("Before Login")
console.log("-----------")
export const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Hi from before login!</b>
        {' This is where site admins will log in to manage your store. Customers will need to '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>log in to the site instead</a>
        {' to access their user account, order history, and more.'}
      </p>
    </div>
  )
}
