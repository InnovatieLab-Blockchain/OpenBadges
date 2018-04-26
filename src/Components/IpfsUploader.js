import React from "react";
import {Button, Form, Label, Input, FormText, Table, container} from 'reactstrap';
import ipfs from '../utilities/ipfs';

export class IpfsUploader extends React.Component {
 constructor(props) {

   super(props)


   this.state = {
     file: '',
     imagePreviewUrl: '',
     ipfsHash: ''
     };
    }




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
    <div class="container">
      <div className="bg-info">
      <div class="col-md-6 offset-md-3">
   <div class="light">

      <h4>IPFS</h4>

      <div class="mb-6">

        <Form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile}/>
        <Label for="badgeDescription"></Label>
          <Button color="primary" type="submit">
            Upload to IPFS
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
            <b class="text-white">IPFS</b>
          </th>
        </thead>
        <tbody>
          <tr>
          <td>IPFS url</td>
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
  </div>
</div>
 );
 }
}
