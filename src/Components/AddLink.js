import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import './AddLink.css';

export default function AddLink(props){
    
    const [modal,showModal] = useState(false) 
    const [name,setName] = useState('')
    const [url,setUrl] = useState('')
    const [tags,setTags] = useState([])
    const [key,setKey] = useState(0)

    function submitLink(){
        props.addLink(name,url,tags,key)
        showModal(false)
        setName('')
        setUrl('')
        setTags([])
        setKey((prev)=>prev+1)
    }

    function onTagChange(i,e){
        //It's equal to spread operator I think
        const newTags =  tags.slice()
        newTags[i]={
            name: e.target.value
        }
        setTags(newTags)
    }

    return(
        <div>
            <Button variant="success" onClick={()=>showModal(!modal)}>Add Link</Button>
            <Modal show={modal}>

                <Modal.Header>Add Link Form</Modal.Header>
                <Modal.Body>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>e.target.value!=null?setName(e.target.value):""}
                    />
                    <br/>
                    <label>URL:</label>
                    <input
                        type="text"
                        value={url}
                        placeholder="Begins with http://"
                        onChange={(e)=>setUrl(e.target.value)}
                    />
                    <br/>
                    <label>Tags</label>
                    <br/>
                    {tags && tags.length>0? tags.map((tag,i)=>{
                        return(
                            <input
                            key={i}
                            type="text"
                            value={tag.name}
                            onChange={(e)=>onTagChange(i,e)}/>
                        )
                    }): "No Tags "}
                    <Button variant="secondary" onClick={()=>{setTags(tags.concat([{name:''}]))}}>Add tag</Button>

                    <Modal.Footer>
                        <Button variant="primary" onClick={submitLink}>Submit</Button>
                        <Button variant="danger" onClick={()=>showModal(!modal)}>Cancel</Button>
                    </Modal.Footer>

                </Modal.Body>
            </Modal>

        </div>
    )
}