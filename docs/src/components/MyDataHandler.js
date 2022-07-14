import useGlobalData from '@docusaurus/useGlobalData'
import React from 'react'

export default function MyDataHandler(props) {
  const data = useGlobalData();
  // console.log({props,data})
  return (
    <div>MyDataHandler</div>
  )
}
