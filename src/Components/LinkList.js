import {useState} from 'react'
import './LinkList.css';


export default function LinkList(props){

    function submitDelete(i){
        console.log(`delete key is ${i}`)
        props.deleteLink(i)
      }

    return(
        <div>
            {props.links&&props.links.length>0?
            props.links.map((link)=>(
                <div className="link" key={link.key}>
                    <div className='linkTags'>
                        <div className="justForStyling"><a href={link.url} target='_blank'>
                            {link.name}
                        </a></div>
                        <div className="justForStyling2">
                        {link.tags&&link.tags.length>0? 
                            link.tags.map((tag,i)=>(
                                <span key={i}>#{tag.name} </span>
                            )):"No tags present"}
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>submitDelete(link.key)}>DELETE LINK</button>
                    </div>
                </div>
            ))
            :"No links present, please add a link"}
        </div>
    )
}