// ** React Imports
import React, { Fragment } from "react";
import { X } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { ToastContent } from "../../../components/Toast";
import axios from "axios";
import { api } from "../../../utils/api_routes";
class AddTutorSubject extends React.Component {
  state = {
    created_at: "",
    id: "",
    title: "",
    tutor_user_id: "",
    status: "",
    description: "",
  };

  async componentDidMount() {
    await this.setState({
      created_at: this.props.selectedSubject.created_at,
      id: this.props.selectedSubject.id,
      title: this.props.selectedSubject.title,
      tutor_user_id: this.props.selectedSubject.tutor_user_id,
      status: this.props.selectedSubject.status,
      description: this.props.selectedSubject.description,
    });
  }

  // //handle remove event
  handleRemove = () => {
    var params = new FormData();
    params.append("id", this.state.id);
    params.append("tutor_user_id", this.state.user_id);
    this.props.removeEvent(params);
    this.handleAddSubjectSidebar();
  };
  //handle add event
  handleAddUpdateSubject = () => {
    const { t } = this.props;
    if (this.state.title == "" || this.state.description == "") {
      toast.dismiss();
      toast(() => ToastContent("Please fill all required fields"), {
        toastId: "fillFields",
        hideProgressBar: true,
        autoClose: 3000,
        type: toast.TYPE.ERROR,
      });
      return;
    }

    var event = new FormData();
    event.append("tutor_user_id", this.props.AuthData.id);
    if (this.state.id !== "") {
      event.append("id", this.state.id);
    }

    event.append("title", this.state.title);
    event.append("status", this.state.status);
    event.append("description", this.state.description);
    this.AddEditSubject(event);
  };

  AddEditSubject = (event) => {
    toast.dismiss();

    toast(() => ToastContent("Please wait"), {
      toastId: "pleaseWait",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
      autoClose: 1000,
    });

    var url = "";
    if (this.state.id === "") {
      url = api.storeTutorSubjects;
    } else {
      url = api.updateTutorSubjects + "/" + this.state.id;
    }

    axios
      .post(url, event)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Subject added successfully"), {
          toastId: "successToast",
          hideProgressBar: true,
          autoClose: 3000,
          type: toast.TYPE.SUCCESS,
        });
        this.handleAddSubjectSidebar();
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("Error while adding subject"), {
          toastId: "errorToast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
      });
  };

  // // ** Event Action buttons
  EventActions = () => {
    const { t } = this.props;
    if (this.props.sidebarType == "add") {
      return (
        <Fragment>
          <Button
            className="mr-1"
            type="submit"
            color="primary"
            onClick={() => this.handleAddUpdateSubject()}
          >
            Add Subject
          </Button>
          <Button
            color="secondary"
            type="reset"
            outline
            onClick={() => {
              this.handleAddSubjectSidebar();
            }}
          >
            Cancel
          </Button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Button
          className="mr-1"
          color="primary"
          onClick={() => this.handleAddUpdateSubject()}
        >
          Update Subject
        </Button>
      </Fragment>
    );
  };
  // //close
  handleAddSubjectSidebar = () => {
    this.setState({
      created_at: "",
      id: "",
      title: "",
      tutor_user_id: "",
      status: "",
      description: "",
    });
    this.props.handleAddSubjectSidebar();
  };
  // ** Close BTN
  CloseBtn = () => (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => this.handleAddSubjectSidebar()}
    />
  );
  render() {
    const { handleAddSubjectSidebar, isOpen, t } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={() => this.handleAddSubjectSidebar()}
        className="sidebar-lg"
        contentClassName="p-0"
        modalClassName="modal-slide-in event-sidebar"
      >
        <ModalHeader
          className="mb-1"
          toggle={handleAddSubjectSidebar}
          close={this.CloseBtn()}
          tag="div"
        >
          <h5 className="modal-title">
            {this.props.sidebarType == "add" ? "Add Subject" : "Edit Subject"}
          </h5>
        </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              name="title"
              id="title"
              placeholder="Title"
              defaultValue={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="startDate">Description</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              onChange={(e) => this.setState({ description: e.target.value })}
              defaultValue={this.state.description}
            />
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col-12">
                <div className="col-12">
                  <Label for="startDate" className="mb-0">
                    Please check if you wants to publish the subject
                  </Label>
                </div>
                <div className="col-12">
                  <Input
                    name="checkbox"
                    type="checkbox"
                    className="form-sm-control"
                    value={this.state.status}
                    defaultChecked={
                      parseInt(this.state.status) === 1 ? true : false
                    }
                    onChange={(e) =>
                      this.setState({ status: e.target.checked })
                    }
                  />
                </div>
              </div>
            </div>
          </FormGroup>
          <br/>
          <div className="row">
            <div className="col-12">
              <FormGroup>{this.EventActions()}</FormGroup>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddTutorSubject;
