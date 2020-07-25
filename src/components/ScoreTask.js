import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Button
} from 'reactstrap';
import './scoretask.css';
import { Alert } from 'reactstrap';


// let masterData;
class ScoreTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filteredData: null,
            imageList: [],
            score: [],
            notFound:null,
            visible:false
        }
    }
    changeHandler = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    searchHandler = () => {
        var masterData = localStorage.getItem('masterData');
        let list = masterData ? JSON.parse(masterData) : [];
        if (list.length) {
            const searchObj = list.filter(item => 
                {
                    return item.name.toLocaleLowerCase() === this.state.search.toLocaleLowerCase();
                })[0];
                this.setState({
                    filteredData: searchObj ? searchObj : null,
                    imageList: searchObj ? searchObj.images: [],
                    notFound: !searchObj
                });

        }
    }

    scoreHandler = (index, event) => {
        const newVal = event.target.value;
        if (!isNaN(newVal) && +newVal <= 10) {

            let list = [...this.state.imageList];
            list[index].score = event.target.value;
            this.setState({
                imageList: list
            });
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.searchHandler();
        }
    }

    saveHandler = () => {
        var masterData = JSON.parse(localStorage.getItem('masterData'));
        // console.log(masterData);
        if(masterData && masterData.length){
            for (var i = 0; i < masterData.length; i++) {
                if (masterData[i].name === this.state.filteredData.name) {
                    masterData[i].images = this.state.imageList;
                }
            }
            console.log(masterData);
            localStorage.setItem('masterData', JSON.stringify(masterData));
            this.setState({
                search: '',
                filteredData: null,
                imageList: [],
                score: [],
                notFound:null,
                visible:true,
            })
        }
        
    }
    onDismiss=()=>{
        this.setState({
            visible:false
        })
    }

    render() {
        const {filteredData, imageList, search}=this.state
        return (
            <div>
                <Container>
                    
                    <Row className="mb-5">

                        <Col size={6}  className="pr-1">
                            <Input className="search" placeholder="Search Task" value={search} onChange={this.changeHandler} onKeyPress={this.handleKeyPress}/>
                        </Col>
                        <Col size={3} className="p-0" >
                            <Button color="primary" onClick={this.searchHandler}>Search</Button>
                        </Col>
                    </Row>
                    {filteredData?
                    <div>
                       <Row>
                           <Col xs={6} md={2}>
                               <p className="task-info">Name :</p>
                           </Col>
                           <Col xs={6} md={6}>
                               <p>{filteredData.name}</p>
                           </Col>
                       </Row>
                       <Row>
                           <Col xs={6} md={2}>
                               <p className="task-info">Description :</p>
                           </Col>
                           <Col xs={6} md={6}>
                               <p >{filteredData.description}</p>
                           </Col>
                       </Row>
                       <Row>
                           <Col xs={6} md={2}>
                               <p className="task-info">Images :</p>
                           </Col>
                           <Col md={10}>
                               <div>
                                   <Row>

                                   

                                        {imageList.map((imgObj, index)=>{
                                        return <Col md={4} className="mb-4" key={`image-${index}`}>
                                                    <div className="score-div" >
                                                        <img alt="taskImage" className="image image-dimension" src={imgObj.path}/>
                                                        <p className="score-text">Score:</p> 
                                                        <Input className="score-input" placeholder="Enter Score" value={imgObj.score || ''} onChange={this.scoreHandler.bind(this,index)} ></Input>   
                                                    </div>
                                                </Col>
                                        })}
                                   </Row>

                               </div>

                           </Col>

                       </Row>
                       <Col md ={2}>

                        <Button color='success' className="save-button" block onClick={this.saveHandler}>Save </Button>
                       </Col>
                     </div> : this.state.notFound ? <p className="not-found">404 Data Not Found. Try Again</p>:null}
                    <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                       Data saved.
                    </Alert>
                </Container>
            </div>
        );
    }
}

export default ScoreTask;