import React from 'react'

export default function Props({ props }) {
  // console.log(props);
  return (
    <div>{JSON.stringify(props,undefined,1)}</div>
  )
}
