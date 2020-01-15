import React from 'react'

const  items = [
  {name:"Dashboard",link:'/dashboard'},
  {name:"Crimes",link:'/crimes'},
  {name:"Departments",link:'/departments'},
  {name:"Investigation",link:'/investigation'},
  {name:"Maps",link:'/maps'},
  {name:"People",link:'/people'},
  {name:"Tables",link:'/tables'},
]

export default function SideNavBar() {
  return (
    <div>
      <ul>
        {items.map(item=><li><a href={item.link}>{item.name}</a></li>)}
      </ul>
    </div>
  )
}
