import React from "react";
import {Button, Form, Label, Input, FormText, Table, container} from 'reactstrap';
import ipfs from '../utilities/ipfs';

export class CreateAssertion extends React.Component {
 constructor(props) {

   super(props)


   this.state = {
     type: '',
     salt: '',
     identity: '',
     evidence: ',    //smart contract address
     issuedOn: '',

     };

     this.handleTypeChange = this.handleTypeChange.bind(this);
     this.handleSaltChange = this.handleSaltChange.bind(this);
     this.handleIdentityChange = this.handleIdentityChange.bind(this);
     this.handleEvidenceChange = this.handleEvidenceChange.bind(this);
     this.handleIssedOnChange = this.handleIssedOnChange.bind(this);

      }


       handleTypeChange (evt) {
         this.setState({ type: evt.target.value });
       }

       handleSaltChange (evt) {
         this.setState({ salt: evt.target.value });
       }

       handleIdentityChange (evt) {
         this.setState({ identity: evt.target.value });
       }
       handleEvidenceChange (evt) {
         this.setState({ evidence: evt.target.value });
       }
       handleIssuedOnChange (evt) {
         this.setState({ issuedOn: evt.target.value });
       }


   _downloadTxtFile = () => {
     var element = document.createElement("a");
     var output1 = this.state.type
     var output2 = this.state.salt
     var output3 = this.state.identity
     var output4 = this.state.evidence
     var output5 = this.state.issuedOn

     var textToSave = "{  \"@context\": \"https://w3id.org/openbadges/v2\"," +
                      "\"type\"\: [\"BadgeClass\"," +
                      "\"id\": \"" + output1 + "\", " +
                      "\"name\": \"" + output2 + "\", " +
                      "\"description\": \"" + output3 + "\", " +
                      "\"image\": \"" + output4 + "\", " +
                      "\"criteria\": \"" + output5 + "\"" +
                      "  }"

   var file = new Blob([textToSave], {type:"text/plain"});
   element.href = URL.createObjectURL(file);
   element.download = this.state.nameBadge + "assertion.txt";
   element.click();
 }

 _handleSubmit(e) {
   e.preventDefault();
   // TODO: do something with -> this.state.file
   console.log('handle uploading-', this.state.file);

 }

 _handleImageChange(e) {
   e.preventDefault();

   let reader = new FileReader();
   let file = e.target.files[0];

   reader.onloadend = () => {
     this.setState({file: file, imagePreviewUrl: reader.result});
   }

   reader.readAsDataURL(file)
 }
 //IPFS
 state = {
   ipfsHash: null,
   buffer: ''
 };


 captureFile = (event) => {

   event.stopPropagation()
   event.preventDefault()
   const file = event.target.files[0]

   let reader = new window.FileReader()
   reader.readAsArrayBuffer(file)
   reader.onloadend = () => this.convertToBuffer(reader)
 };
 convertToBuffer = async (reader) => {
   //file is converted to a buffer for upload to IPFS
   const buffer = await Buffer.from(reader.result);
   //set this buffer -using es6 syntax
   this.setState({buffer});
 };

 onSubmit = async (event) => {

   event.preventDefault();
   await ipfs.add(this.state.buffer, (err, ipfsHash) => {
     console.log(err, ipfsHash);
     //setState by setting ipfsHash to ipfsHash[0].hash
     this.setState({ipfsHash: ipfsHash[0].hash});

   })
 };


 render(props) {



   return (
    
   <div class="light">

      <h4>Badge Class</h4>
      <form>
        <div class='mb-6'>
        <Label for='type'>
            type of the recipient id
        </Label>
        <Input
          type='plaintext'
          class='form-control'
          name='type'
          id='type'
          placeholder='The type of the badge'
          onChange={this.handleTypeChange}/>
        </div>
        <div class='mb-6'>
        <Label for='name'>
            Name
        </Label>
        <Input
          type='plaintext'
          class='form-control'
          name='badgeName'
          id='badgeName'
          placeholder='name badge'
          onChange={this.handleNameBadgeChange}/>
        </div>
        <div class='mb-6'>
        <Label for='badgeDescription'>
            Badge description
        </Label>
        <Input
          type='textarea'
          name='badgeDescription'
          id='badgeDescription'
          placeholder='A short summary of this achievement' onChange={this.handleDescriptionBadgeChange}/>
        </div>
        <div class='mb-6'>
        <Label for='badgeCriteria'>
            Badge criteria
        </Label>
        <Input
          type='textarea'
          name='badgeCriteria'
          id='badgeCriteria'
          placeholder='The criteria of the badge' onChange={this.handleCriteriaChange}/>
        </div>
      </form>
      <br/>
      <div class="mb-6">
        <Label for="Badge image">
          Badge image
        </Label>
        <Form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile}/>
        <Label for="badgeDescription"></Label>
          <Button color="primary" type="submit">
            Upload
          </Button>
          <br/>
        </Form>
      </div>

    </div>
  </div>
  <div>
    <div class="col-md-6 offset-md-3">
      <Table bordered="bordered">
        <thead class="bg-primary">
          <th>
            <b class="text-white">Badge image</b>
          </th>
        </thead>
        <tbody>
          <tr>
            <td><img src={"https:ipfs.io/ipfs/" + this.state.ipfsHash} style={{
              width: 150}}/></td>
            <td>
              <a href={"https:ipfs.io/ipfs/" + this.state.ipfsHash} target="_blank">link to ipfs</a>
            </td>
          </tr>
          <tr>
            <td>Hash value</td>
            <td id="ipfsHash">{this.state.ipfsHash}</td>
          </tr>
        </tbody>
      </Table>
  </div>
  </div>

  <br/>
  <div>
    <Button color='primary' size='lg' onClick={this._downloadTxtFile}>Download badge</Button>
  </div>
  <br />

 );
 }
}
