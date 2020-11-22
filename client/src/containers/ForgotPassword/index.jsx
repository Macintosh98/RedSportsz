import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Form } from "react-bootstrap";
import { Button, Col,Row,Label,Modal,Table,Input } from "reactstrap";
import { useHistory } from "react-router";
import {forgetPassword,resetPassword} from "../../actions";
import { Link } from "react-router-dom";


export default function ForgetPassword({forgetPassword,resetPassword,resetPasswordSucsses,forgetPasswordSucsses}) {

  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  let form;
  const path=useHistory().location.pathname;
  var validateMsgValid=(
    <div></div>
  // <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }else{
        NotificationModel("bg-danger","Password Not Reset")
      }setIsSubmit(false)
    }
  }, [resetPasswordSucsses])

  React.useEffect(() => {
    if(forgetPasswordSucsses)if(isSubmit){
      if(forgetPasswordSucsses.status==200){
        NotificationModel("bg-success","Email Sent Sucssesfully")
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }else{
        NotificationModel("bg-danger","Email Not Sent or link Time")
      }setIsSubmit(false)
    }
  }, [forgetPasswordSucsses])

    if(path=='/forgot-password'){
        form= (
        <div className="bg-secondary shadow card">
            <div className="card-header">Forgot Password</div>
            <div className="card-body">
                <Form noValidate validated={isSubmit} onSubmit={submitForgotPassword}>
                    <Form.Group>
                        <Input required onChange={ e => setEmail(e.target.value)} className="form-control-alternative" type="email" placeholder="Enter email" />
                                          {validateMsgValid}
                  {validateMsgInvalid}
                        <br/>
                        <Button color="primary" type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                        <Button color="primary" className="btn btn-primary" to="/" tag={Link}>
                            Back To Login
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
        )
    }else{

              var d=new Date();
              var id=path.split("$")[1]
              var mailtime=path.split("$")[2]
              var date=path.split("$")[3]
              let currenttime= d.getHours()+"-"+d.getMinutes();
              let currentdate= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
              if(currentdate==date && diff(mailtime, currenttime)){
                    form= (
                    <div className="bg-secondary shadow card">
                        <div className="card-header">Forgot Password</div>
                        <div className="card-body">
                            <Form noValidate validated={isSubmit} onSubmit={submitResetPassword}>
                                <Form.Group>
                                    <Label>Enter New Password</Label>
                                    <Input required onChange={ e => setPassword(e.target.value)} className="form-control-alternative" type="password" />
                                                      {validateMsgValid}
                              {validateMsgInvalid}
                                    <Label>ReEnter New Password</Label>
                                    <Input required onChange={ e => setConfirmPassword(e.target.value)} className="form-control-alternative" type="password" />
                                                      {validateMsgValid}
                              {validateMsgInvalid}
                                    <br/>
                                    <Button color="primary" type="submit" className="btn btn-primary">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    )
              }else{
                  form= (<div>link is invalid</div>)
              }

    }

  function submitForgotPassword(e){
    setIsSubmit(true);
    e.preventDefault();
    if(e.currentTarget.checkValidity()){
      if(Password==ConfirmPassword){
    forgetPassword({'email':email,"userId" : localStorage.getItem("userid")},localStorage.getItem("token"));
      }else NotificationModel( "bg-danger" ,"Password Not Match")  
  }
  }

  function submitResetPassword(e){
    setIsSubmit(true);
        e.preventDefault();
    if(e.currentTarget.checkValidity()){
      if(Password==ConfirmPassword){
    var d=new Date();
    var id=path.split("$")[1]
    var mailtime=path.split("$")[2]
    var date=path.split("$")[3]
    let currenttime= d.getHours()+"-"+d.getMinutes();
    let currentdate= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
    console.log(currentdate+" "+date)
    if(currentdate==date && diff(mailtime, currenttime)){
        let data={
            "forgotPassword": true,
            "userid": id,
            "password":Password,
            "userId" : localStorage.getItem("userid")
        }
        resetPassword(data,localStorage.getItem("token"));
    }else{
        console.log("link is invalid");
    }
  }else NotificationModel( "bg-danger" ,"Password Not Match")
  }
  }

  function diff(start, end) {
    start = start.split("-");
    end = end.split("-");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
    return (hours<=0 && minutes <=20 ? true : false)
  }

    return (
      <div class="py-5" style={{ "background-color": "#333333" }}>
        <div className="container mt-5" >
               {form}
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
        </div>
      </div>
    );
};

const mapDispatchToProps =  {
    forgetPassword:forgetPassword,
    resetPassword:resetPassword
}

const mapStateToProps = (state) => ({
    resetPasswordSucsses:state.resetPasswordSucsses,
    forgetPasswordSucsses:state.forgetPasswordSucsses
})

ForgetPassword = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgetPassword);
