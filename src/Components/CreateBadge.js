import React from "react";
import {Button, Form, Label, Input, FormText, Table, container} from 'reactstrap';
import ipfs from '../utilities/ipfs';

export class CreateBadge extends React.Component {
 constructor(props) {

   super(props)


   this.state = {
     idBadge: '',
     nameBadge: '',
     descriptionBadge: '',
     imagePreviewUrl: '',
     criteria:''
     };

     this.handleIdBadgeChange = this.handleIdBadgeChange.bind(this);
     this.handleNameBadgeChange = this.handleNameBadgeChange.bind(this);
     this.handleDescriptionBadgeChange = this.handleDescriptionBadgeChange.bind(this);
     this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
      }


       handleIdBadgeChange (evt) {
         this.setState({ idBadge: evt.target.value });
       }

       handleNameBadgeChange (evt) {
         this.setState({ nameBadge: evt.target.value });
       }

       handleDescriptionBadgeChange (evt) {
         this.setState({ descriptionBadge: evt.target.value });
       }
       handleCriteriaChange (evt) {
         this.setState({ criteria: evt.target.value });
       }


 _downloadTxtFile = () => {
   var element = document.createElement("a");
   var output1 = this.state.idBadge
   var output2 = this.state.nameBadge
   var output3 = this.state.descriptionBadge
   var output4 = "https:ipfs.io/ipfs/" + this.state.ipfsHash
   var output5 = this.state.criteria

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
   element.download = this.state.nameBadge + "badge.txt";
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
    <div class="Container">
      <div>
   <div class="light">

      <h4>Badge Class</h4>
      <form>
        <div class='mb-6'>
        <Label for='badgeCreator'>
            Id of the badge
        </Label>
        <Input
          type='plaintext'
          class='form-control'
          name='idBadge'
          id='idBadge'
          placeholder='The external id of the badge'
          onChange={this.handleIdBadgeChange}/>
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
</div>
 );
 }
}
