import React, {useEffect} from 'react';
import './App.css';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Footer from './Components/Footer';

function App() {

let[data,setData] = useState('')
const loader=()=>{

  let timerInterval:any
  Swal.fire({
  title: 'Loading',
  html: '',
  timer: 3000,
  timerProgressBar: true,
  willOpen: () => {
  Swal.showLoading()
  timerInterval = setInterval(() => {
  const content = Swal.getContent()
  if (content) {
  const b:any = content.querySelector('b')
  if (b) {
  b.textContent = Swal.getTimerLeft()
  }
  }
  } , 100)
  },
  onClose: () => {
  clearInterval(timerInterval)
  }
  }).then((result) => {

  if (result.dismiss === Swal.DismissReason.timer) {

  }
  })
  }
  const handleCheck=(content:any)=>{

    if(content?.value.message==='Success')
    {
      const message = 'SuccessFully'.concat(content?.type)
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      Swal.fire('Opp Somthing Went Wrong')
    }
    
  }



const handle = async() => {


  const result = await fetch(`/.netlify/functions/AddData`,{
  method:'POST',
  body: JSON.stringify({data:data})
  });
const value = await result.json();
handleCheck({value:value,type:'Added'})
  handleData() ;
  setData('')



}

const handeinput=(e:React.ChangeEvent<HTMLInputElement>)=>{

  e.preventDefault()
  setData(e.target.value);

  }
  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>)=>{

    e.preventDefault();
    if(data==='')
    {
    const text = 'Empty text can not be added'
    Swal.fire(text)


    }else{
      loader();
    handle();
    
    }



}
    let [dataread,setDataRead] = useState < any> ([]);

      const handleData = async() => {
      const result = await fetch('/.netlify/functions/ReadData')
      const value = await result.json()
      setDataRead(value?.message?.data)

    }
      const handleDelete = async(ref : any) => {
        loader();
      
      const result = await fetch('/.netlify/functions/DeleteData', {
      method: 'POST',
      body: JSON.stringify({data: ref})
      })
      const value =  await result.json()
      handleCheck({
        value:value,
        type:'Deleted'
      })
      
      

      handleData() ;
    }

      const handleUpdate = async(ref : any) => {
      
        loader();
      const result = await fetch('/.netlify/functions/ReadSpecific', {
      method: 'POST',
      body: JSON.stringify({data: ref})
      })
      const data = await result.json()
      const {value: text} = await Swal.fire({
      input: 'textarea', inputLabel: 'Edit/Update',
      inputValue: data?.message?.data?.information,
      showCancelButton: true
      })

      if (text) {
      
      
      loader()
      const updateresult = await fetch('/.netlify/functions/UpdateData', {
      method: 'POST',
      body: JSON.stringify({
      data: {
      ref: ref,
      information: text
      }
      })
      })
      const value = await updateresult.json()
      handleCheck({
        value:value,
        type:'Updated'
      })
      handleData() ;
      }
    }
      useEffect(() => {
      
          handleData();

      }, [])
      return (
      <div className="container mt-5">
        <div className='row d-flex justify-content-center '>
          <div className='col-md-4'>
            <h1 className='mb-4 headertext text-center'>FaunaDB Crud App Using Netlify</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">

                <input type="text" className="form-control" id="text" value={data} placeholder='Enter Here'
                  onChange={handeinput} />

              </div>

              <button type="submit" className="btn btn-primary">Add</button>
            </form>
            <ul className="list-group mt-3  fixover">
              {dataread.length ? (
              <>{dataread?.map((value : any, key : any) => {

                return (
                <li key={key} className="list-group-item list-group-item-action d-flex justify-content-between">
                  <span>{value
                    ?.data
                    ?.information}</span>
                  <span>
                    <i className="far fa-edit iconcolor btn " data-toggle="tooltip" data-placement="top"
                      title="Edit/Update" onClick={()=> {
                      handleUpdate(value.ref['@ref'].id)
                      }}></i>
                    <i className=" fas fa-window-close  iconcolor btn " data-toggle="tooltip" data-placement="top"
                      title="Delete" onClick={()=> {
                      handleDelete(value.ref['@ref'].id)
                      }}></i>
                  </span>
                </li>
                )
                })}</>

              ):(
              <div className='container'>
                <div className='row d-flex justify-content-center'>
                  <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
              )}
            </ul>
          </div>
        </div>
                <Footer></Footer>
      </div>
      )}

      export default App