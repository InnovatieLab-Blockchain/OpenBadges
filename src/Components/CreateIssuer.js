import React from "react";
import {Button, Form, Label, Input, FormText, Table, container} from 'reactstrap';
import ipfs from '../utilities/ipfs';

export class CreateIssuer extends React.Component {
 constructor(props) {

   super(props)


   this.state = {
     idUport: '',
     name: '',
     imagePreviewUrl: '',
     url: '',
     email: '',

     };
     this.handleIdUportChange = this.handleIdUportChange.bind(this);
     this.handleNameChange = this.handleNameChange.bind(this);
     this.handleUrlChange = this.handleUrlChange.bind(this);
     this.handleEmailChange = this.handleEmailChange.bind(this);
     }

       handleIdUportChange (evt) {
         this.setState({ idUport: evt.target.value});
       }

       handleNameChange (evt) {
         this.setState({ name: evt.target.value });
       }
       handleUrlChange (evt) {
         this.setState({ url: evt.target.value });
       }
       handleEmailChange (evt) {
         this.setState({ email: evt.target.value });
       }







 _downloadTxtFile = () => {
   var element = document.createElement("a");
   var output1 = this.state.idUport
   var output2 = this.state.name
   var output3 = "https:ipfs.io/ipfs/" + this.state.ipfsHash
   var output4 = this.state.url
   var output5 = this.state.email



   var textToSave = "{  \"@context\":         \"https://w3id.org/openbadges/v2\"," +
                    "\"type\"\: \"Issuer\",\"uportid\"\]," +
                    "\"id\": \"" + output1 + "\", " +
                    "\"name\": \"" + output2 + "\", " +
                    "\"image\": \"" + output3 + "\", " +
                    "\"url\": \"" + output4 + "\", " +
                    "\"email\": \"" + output5 + "\"" +
                    "  }"


   var file = new Blob([textToSave], {type:"text/plain"});
   element.href = URL.createObjectURL(file);
   element.download = this.state.name + "issuer.txt";
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

   // let {imagePreviewUrl} = this.state;
   // let $imagePreview = null;
   // if (imagePreviewUrl) {
   //   $imagePreview = (<img src={imagePreviewUrl}/>);
   // } else {
   //   $imagePreview = ();
   // }

   return (
    <div class="container">

      <div>
   <div class="light">

      <h4>Issuer</h4>
      <form>
        <div class='mb-6'>
        <Label for='issuerCreator'>
            Issuer Uport ID
        </Label>
        <Input
          type='plaintext'
          class='form-control'
          name='IdUport'
          id='IdUport'
          placeholder='The uport ID of the Issuer'
          onChange={this.handleIdUportChange}/>
        </div>

        <div class='mb-6'>
        <Label for='name'>
            Name
        </Label>
        <Input
          type='plaintext'
          class='form-control'
          name='issuerName'
          id='issuerName'
          placeholder='Name of the Issuer organisation'
          onChange={this.handleNameChange}/>
        </div>



        <div class='mb-6'>
        <Label for='url'>
            Url
        </Label>
        <Input
          type='plaintext'
          name='url'
          id='url'
          placeholder='The url of the issuer' onChange={this.handleUrlChange}/>
        </div>

        <div class='mb-6'>
        <Label for='email'>
            Email address
        </Label>
        <Input
          type='plaintext'
          name='email'
          id='email'
          placeholder='The email address of the issuer' onChange={this.handleEmailChange}/>
        </div>

      </form>
      <br/>
      <div class="mb-6">
        <Label for="Badge image">
          Issuer image
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
            <b class="text-white">Issuer image</b>
          </th>
        </thead>
        <tbody>
          <tr>
            <td><img src={"https:ipfs.io/ipfs/" + this.state.ipfsHash} style={{
              width: 150}}/></td>
            <td>
              <a href={"https:ipfs.io/ipfs/" + this.state.ipfsHash} target="_blank">{"https:ipfs.io/ipfs/" + this.state.ipfsHash}</a>
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
    <Button color='primary' size='lg' onClick={this._downloadTxtFile}>Download Issuer</Button>
  </div>
  <br/>
</div>

 );
 }
}
