import logo from './sharelink.png';
import React, {useState,useEffect} from 'react'
import './App.css';
import {Container,Row,Col} from 'react-bootstrap'
import AddLink from './Components/AddLink'
import SearchBar from './Components/SearchBar'
import LinkList from './Components/LinkList'

function App() {
  //logic to get links from localstorage

  const storedLinks = localStorage.getItem('shareLinks')
  const parsedLinks = storedLinks === ""||storedLinks === null? []: JSON.parse(storedLinks)

  const [links,setLinks] = useState(Array.isArray(parsedLinks)?parsedLinks:[])
  const [search,setSearch] = useState("")
  // console.log(links)


  function filterFunction(searchValue){
    const lowerSearch = searchValue.toLowerCase()
    return links.filter(link=>{
      // console.log(link)
      return (
        link.name.toLowerCase().indexOf(lowerSearch)>-1||
        link.url.toLowerCase().indexOf(lowerSearch)>-1||
        link.tags.map((tag)=>{
          return tag.name.toLowerCase().indexOf(lowerSearch)>-1
        })
        .indexOf(true)>-1
    )})
  }

  function addLink(name,url,tags,key){
    const newLinks = links.concat([
    {
      name,
      url,
      tags,
      key
    }
    ])
    setLinks(newLinks)
    //Add local storage here
    localStorage.setItem('shareLinks',JSON.stringify(newLinks))
  }

  function deleteLink(key){
    const listOfLinks =  links.map(link=>link)
    const deleteLinkIndex = listOfLinks.findIndex(link=>link.key===key)
    const deleteLink = links[deleteLinkIndex]
    const copyOfLinks = [...links]
    const mapCopyOfLinks =copyOfLinks.map(link=>link)
    const latestLinks = mapCopyOfLinks.splice(deleteLinkIndex,1)
    setLinks(mapCopyOfLinks)
    //Add local storage here
    localStorage.removeItem('shareLinks',JSON.stringify(deleteLink))
  }

  return (
    <Container>
      <Row>
          <img src={logo} className="App-logo" alt="logo"/>
        <Col xs={12} sm={12} md={6}>
          <br/>
          <div id="addLink">
            <h4>Links shared: {links.length>0?links.length:"Please add links!"}</h4>
            <AddLink addLink={addLink}/>
            <p></p>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <br/>
          <h4>Search for stored links:</h4>
          <SearchBar searchChange={setSearch}/>
          <br/>
          <br/>
          <h4>Links for: {search}</h4>
          <LinkList links={filterFunction(search)} deleteLink={deleteLink}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
