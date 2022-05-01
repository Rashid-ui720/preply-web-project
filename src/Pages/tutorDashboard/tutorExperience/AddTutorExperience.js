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
class AddTutorExperience extends React.Component {
  state = {
    id: "",
    title: "",
    tutor_user_id: "",
    description: "",
    start_date: "",
    end_date: "",
    created_at: "",
    start_date: "",
    end_date: "",
  };

  async componentDidMount() {
    await this.setState({
      id: this.props.selectedExperience.id,
      title: this.props.selectedExperience.title,
      tutor_user_id: this.props.selectedExperience.tutor_user_id,
      description: this.props.selectedExperience.description,
      start_date: this.props.selectedExperience.start_date,
      end_date: this.props.selectedExperience.end_date,
      created_at: this.props.selectedExperience.created_at,
    });
  }

  // //handle remove event
  handleRemove = () => {
    var params = new FormData();
    params.append("id", this.state.id);
    params.append("tutor_user_id", this.state.user_id);
    this.props.removeEvent(params);
    this.handleAddExperienceSidebar();
  };
  //handle add event
  handleAddUpdateExperience = () => {
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
    event.append("description", this.state.description);
    event.append("start_date", this.state.start_date);
    event.append("end_date", this.state.end_date);
    this.AddEditExperience(event);
  };

  AddEditExperience = (event) => {
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
      url = api.storeTutorExperience;
    } else {
      url = api.updateTutorExperience + "/" + this.state.id;
    }

    axios
      .post(url, event)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Experience added successfully"), {
          toastId: "successToast",
          hideProgressBar: true,
          autoClose: 3000,
          type: toast.TYPE.SUCCESS,
        });
        this.handleAddExperienceSidebar();
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("Error while adding experience"), {
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
            onClick={() => this.handleAddUpdateExperience()}
          >
            Add Experience
          </Button>
          <Button
            color="secondary"
            type="reset"
            outline
            onClick={() => {
              this.handleAddExperienceSidebar();
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
          onClick={() => this.handleAddUpdateExperience()}
        >
          Update Education
        </Button>
      </Fragment>
    );
  };
  // //close
  handleAddExperienceSidebar = () => {
    this.setState({
      created_at: "",
      id: "",
      title: "",
      tutor_user_id: "",
      school: "",
      description: "",
    });
    this.props.handleAddExperienceSidebar();
  };
  // ** Close BTN
  CloseBtn = () => (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => this.handleAddExperienceSidebar()}
    />
  );
  render() {
    const { handleAddExperienceSidebar, isOpen, t } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={() => this.handleAddExperienceSidebar()}
        className="sidebar-lg"
        contentClassName="p-0"
        modalClassName="modal-slide-in event-sidebar"
      >
        <ModalHeader
          className="mb-1"
          toggle={handleAddExperienceSidebar}
          close={this.CloseBtn()}
          tag="div"
        >
          <h5 className="modal-title">
            {this.props.sidebarType == "add"
              ? "Add Experience"
              : "Edit Experience"}
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
            <Label for="description">Description</Label>
            <Input
              id="description"
              name="text"
              type="textarea"
              onChange={(e) => this.setState({ description: e.target.value })}
              defaultValue={this.state.description}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              name="title"
              id="startDate"
              placeholder="Start date"
              defaultValue={this.state.start_date}
              type="date"
              required
              onChange={(e) => this.setState({ start_date: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              name="title"
              id="endDate"
              placeholder="Start date"
              defaultValue={this.state.end_date}
              type="date"
              required
              onChange={(e) => this.setState({ end_date: e.target.value })}
            />
            <span><small>Leave blank if you are currently working</small></span>
          </FormGroup>
          
          <br />
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

export default AddTutorExperience;
