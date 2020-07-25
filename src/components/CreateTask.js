import React, { Component } from 'react';
import { Container,Row, Col, Input,FormFeedback,Button  } from 'reactstrap';
import validator from './validator';
import { Alert } from 'reactstrap';
import './createtask.css'

let imageList = [];
class CreateTask extends Component {
   
    constructor(){
        super();
        this.state={
            name:'',
            description:'',
           
            visible:false,
            imageList:[],
            validation:{
                nameCheck:'',
                descriptionCheck:'',
             
              }
        }
    }
    changeHandler(event){
        this.setState({
          [event.target.id]:event.target.value
        })
    }
    saveHandler=()=>{
        if(validator.isEmpty(this.state.name)){
            this.setState(prevState=>{
                return{  prevState,
                  validation:{
                      ...prevState.validation,
                      nameCheck:'failure',
                  }
               }
            })
        }
        else{
            this.setState(prevState=>{
                return{  prevState,
                  validation:{
                      ...prevState.validation,
                      nameCheck:'',
                  }
               }
            })
        }
        if(validator.isEmpty(this.state.description)){
            this.setState(prevState=>{
                return{  prevState,
                  validation:{
                      ...prevState.validation,
                      descriptionCheck:'failure',
                  }
               }
            })
        }
        else{
            this.setState(prevState=>{
                return{  prevState,
                  validation:{
                      ...prevState.validation,
                      descriptionCheck:'',
                  }
               }
            })
        }
       
  
        
        if(this.state.name && this.state.description  && imageList.length){

            const masterData = JSON.parse(localStorage.getItem('masterData')) || [];
            const obj = {
                name:this.state.name,
                description:this.state.description,
                images:imageList || []
            };
            masterData.push(obj);
            console.log(masterData);
            try{
                localStorage.setItem('masterData',JSON.stringify(masterData));
                this.setState({
                    name:'',
                    description:'',
                    visible:true,
                    validation:{
                        nameCheck:'',
                        descriptionCheck:'',
                      }
                },()=>{setTimeout(this.onDismiss,1000)})
            }
            catch{
                console.log('full');
            }
        }
        
    }
    getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }
    imageChangeHandler=(e)=>{
        for(var i =0;i<e.target.files.length;i++){
           
                        this.getBase64(e.target.files[i]).then(b => {
                            const obj = {
                                path: b,
                                score: null
                            };
                            imageList.push(obj);
                            this.setState({
                                imageList:[...imageList]
                            },()=>{
                                console.log('state',this.state.imageList)
                            })
                        }).catch(error=>console.log(error));
            
        }
        console.log('imageList',imageList)
        
       
        
    }
    onDismiss=()=>{
        this.setState({
            visible:false
        },()=>{
            window.location.reload()
        })
    }
    render() {
        const {name,description} = this.state
        return (
            <div>
                <Container>
                    <Alert color="info" isOpen={this.state.visible} >
                       Task Created
                    </Alert>
                    <Row className="mb-4">
                                <Col md={2}>
                                    <label htmlFor="">Name-</label>
                                </Col>
                                <Col md={4}>
                                        <Input type="text" name="name" id="name" value={name} placeholder='Name of the task' onChange={(event)=>this.changeHandler(event)}  invalid={this.state.validation.nameCheck==="failure"} />
                                        
                                        <FormFeedback>Please provide Name.</FormFeedback>
                                 </Col>                               

                    </Row>
                    <Row className="mb-4">
                                <Col md={2}>
                                    <label htmlFor="description">Description-</label>
                                </Col>
                                <Col md={4}>
                                        <Input type="text" name="description" id="description" value={description} placeholder='Enter some details' onChange={(event)=>this.changeHandler(event)}  invalid={this.state.validation.descriptionCheck==="failure"} />
                                        
                                        <FormFeedback>Please provide description.</FormFeedback>
                                 </Col>                               

                    </Row>
                    <Row className="mb-4">
                                <Col md={2}>
                                    <label htmlFor="images">Images-</label>
                                </Col>
                                <Col md={10}>
                                         <input type="file" multiple name="images" id="images" onChange={this.imageChangeHandler} />
                                         <Row className="mt-4 ">
                                            {this.state.imageList.map((imgObj,index)=>{
                                                return <Col key={`image-${index}`}md={2}>
                                                    <img alt='selected-img'className="selected-image" src={imgObj.path}/>
                                                </Col>
                                            })}

                                         </Row>
                                        
                                 </Col>                               

                    </Row>
                    <Row>

                        <Col md={2}>
                            <Button color="primary" block onClick={this.saveHandler}>Save</Button>

                        </Col>
                    </Row>
                                
                </Container>                
            </div>
        );
    }
}

export default CreateTask;