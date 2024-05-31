'use client'

import { FC } from "react"

interface IHeading {
  title: string
}

const Heading: FC<IHeading> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )    
}

export default Heading