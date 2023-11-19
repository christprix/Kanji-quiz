import React from 'react'

export default function Pic({ picture }) {
  return (
    <div>
      <img className="main-pic" src={picture} alt="" />
    </div>
  )
}
