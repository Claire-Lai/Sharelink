import {useState} from 'react'
import styles from  "./SearchBar.module.css"

export default function SearchBar(props){
    const [search,setSearch] = useState('')

    function localChange(e){
        setSearch(e.target.value)
        props.searchChange(e.target.value)
    }

    return(
        <>
        <input type='text' value={search} onChange={localChange} placeholder="Search..." className={styles.inputbox}/>
        </>
    )
}