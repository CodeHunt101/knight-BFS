import React from 'react'

export const Box = ({coordinate, boxColour}) => {
  return (
    <div className="box" id={coordinate} style={{backgroundColor: boxColour}}>
      
    </div>
  )
}