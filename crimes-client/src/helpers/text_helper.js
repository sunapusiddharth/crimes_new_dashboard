import React from 'react'
export function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}


export function getHighlightedText(text, higlight) {
   // Split on higlight term and include term into parts, ignore case
   let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
   return <span> { parts.map((part, i) => 
       <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
           { part }
       </span>)
   } </span>;
}


export function substrWords(str, no_words) {
    return str.split(" ").splice(0,no_words).join(" ");
}