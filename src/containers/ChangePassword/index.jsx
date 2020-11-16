import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Button,Label,Modal,Input } from "reactstrap";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import {resetPassword} from "../../actions";

export default function ChangePassword({resetPassword,resetPasswordSucsses}) {

  const [OldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  var validateMsgValid=(
  // <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
  <div></div>
  )
  var validateMsgInvalid=(<Form.Control.Feedback type="invalid">Please provide a valid Input.</Form.Control.Feedback>)


  const [isSubmit, setIsSubmit] = useState();
  const [Class, SetClass] = useState();
  const [Msg, SetMsg] = useState();
  const [Notification, SetNotification] = useState(false);
  const NotificationClose = () => SetNotification(false);
  const NotificationShow = () => SetNotification(true);
  function NotificationModel(Class,Msg) {
      SetClass(Class)
      SetMsg(Msg)
      NotificationShow();
      setTimeout(function() {
          NotificationClose();
      }, 5000);
  }
  
  React.useEffect(() => {
    if(resetPasswordSucsses)if(isSubmit){
      if(resetPasswordSucsses.status==200){
        NotificationModel("bg-success","Password Reset Sucssesfully")
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      }else{
        NotificationModel( "bg-danger" ,"Password Not Reset")
      }setIsSubmit(false)
    }
  }, [resetPasswordSucsses])

  function submitchangePassword(e){
    e.preventDefault();
    if(e.currentTarget.checkValidity()){
      if(Password==ConfirmPassword){
        let data={
            "changePassword":true,
            "oldpassword":OldPassword,
            "userid": localStorage.getItem("userid"),
            "password":Password,
        }
        resetPassword(data,localStorage.getItem("token"));
      }else NotificationModel( "bg-danger" ,"Password Not Match")
      }
    setIsSubmit(true);
  }
  

    return (
      <div class="py-5" style={{ "background-color": "#333333" }}>
        <div className="container mt-5" >
                       <Modal
              className="modal-dialog modal-danger"
              contentClassName={Class}
              isOpen={Notification}
              toggle={NotificationClose}
            >
              <div className="modal-header">
                <div className="mt-1 modal-title heading">
                  {Msg}
                </div>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={NotificationClose}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
            </Modal>
        <div className="bg-secondary shadow card">
            <div className="card-header">Forgot Password</div>
            <div className="card-body">
                <Form noValidate validated={isSubmit} onSubmit={submitchangePassword}>
                    <Form.Group>


                        <Input placeholder="Enter old Password" value={OldPassword} onChange={ e => setOldPassword(e.target.value)} className="form-control-alternative" type="password" required/>
                  {validateMsgValid}
                  {validateMsgInvalid}
</Form.Group>
<Form.Group>

                        <Input placeholder="Enter New Password" value={Password} onChange={ e => setPassword(e.target.value)} className="form-control-alternative" type="password" required/>
                  {validateMsgValid}
                  {validateMsgInvalid}
</Form.Group>
<Form.Group>

                        <Input placeholder="ReEnter New Password" value={ConfirmPassword} onChange={ e => setConfirmPassword(e.target.value)} className="form-control-alternative" type="password" required/>
                  {validateMsgValid}
                  {validateMsgInvalid}
</Form.Group>
                        <br/>
                        <Button color="primary" type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    
                </Form>
            </div>
        </div>
      </div>
    </div>
    );
};

const mapDispatchToProps =  {
    resetPassword:resetPassword
}

const mapStateToProps = (state) => ({
    resetPasswordSucsses:state.resetPasswordSucsses
})

ChangePassword = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangePassword);
