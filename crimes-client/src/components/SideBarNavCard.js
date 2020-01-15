import React from 'react'

export default function SideBarNavCard(props) {
    let {item}= props
    return (
        <div><a href={item.link}>{item.name}</a></div>
    )
}
