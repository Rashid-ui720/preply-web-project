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
} from "reactstrap";
import { toast } from "react-toastify";
import { ToastContent } from "../../../components/Toast";
import axios from "axios";
import { api } from "../../../utils/api_routes";
class AddTutorEvents extends React.Component {
  state = {
    created_at: "",
    date: "",
    end_time: "",
    id: "",
    show_position: "",
    start_time: "",
    title: "",
    user_id: "",
  };

  async componentDidMount() {
    await this.setState({
      created_at: this.props.selectedEvent.created_at,
      date: this.props.selectedEvent.date,
      end_time:
        this.props.selectedEvent.end_time == ""
          ? ""
          : this.am_pm_to_hours(this.props.selectedEvent.end_time),
      id: this.props.selectedEvent.id,
      show_position: this.props.selectedEvent.show_position,
      start_time:
        this.props.selectedEvent.start_time == ""
          ? ""
          : this.am_pm_to_hours(this.props.selectedEvent.start_time),
      title: this.props.selectedEvent.title,
      user_id: this.props.selectedEvent.user_id,
    });
  }
  //conversion for time
  am_pm_to_hours = (time) => {
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    const AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM.toLowerCase() === "pm" && hours < 12) hours = hours + 12;
    if (AMPM.toLowerCase() === "am" && hours == 12) hours = hours - 12;

    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return `${sHours}:${sMinutes}`;
  };

  //formate time
  formatAMPM = (date) => {
    var timeSplit = date.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }

    var strTime = hours + ":" + minutes + " " + meridian;

    return strTime;
  };

  //handle remove event
  handleRemove = () => {
    var params = new FormData();
    params.append("event_id", this.state.id);
    params.append("user_id", this.state.user_id);
    this.props.removeEvent(params);
    this.handleAddEventSidebar();
  };
  //handle add event
  handleAddUpdateEvent = () => {
    const { t } = this.props;
    if (
      this.state.title == "" ||
      this.state.end_time == "" ||
      this.state.start_time == "" ||
      this.state.date == ""
    ) {
      toast.dismiss();
      toast(() => ToastContent("Please fill all required fields"), {
        toastId: "infoToast",
        hideProgressBar: true,
        autoClose: 3000,
        type: toast.TYPE.ERROR,
      });
      return;
    }

    var event = new FormData();
    event.append("tutor_id", this.props.AuthData.id);
    event.append("start_time", this.formatAMPM(this.state.start_time));
    event.append("end_time", this.formatAMPM(this.state.end_time));
    event.append("date", this.state.date);
    if (this.state.id !== "") {
      event.append("id", this.state.id);
    }

    event.append("reason", this.state.title);
    event.append("is_off", 1);
    this.AddEditEvent(event);
    
  };

  AddEditEvent = (event) => {
    toast.dismiss();

    toast(() => ToastContent("Please wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
      autoClose: 1000,
    });
    
    axios
      .post(api.addEvent, event)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Event added successfully"), {
          toastId: "successToast",
          hideProgressBar: true,
          autoClose: 3000,
          type: toast.TYPE.SUCCESS,
        });
        this.handleAddEventSidebar();
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("Error while adding event"), {
          toastId: "infoToast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
      });
  };

  // ** Event Action buttons
  EventActions = () => {
    const { t } = this.props;
    if (this.props.sidebarType == "add") {
      return (
        <Fragment>
          <Button
            className="mr-1"
            type="submit"
            color="primary"
            onClick={() => this.handleAddUpdateEvent()}
          >
            Add Event
          </Button>
          <Button
            color="secondary"
            type="reset"
            outline
            onClick={() => {
              this.handleAddEventSidebar();
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
          onClick={() => this.handleAddUpdateEvent()}
        >
          Update Event
        </Button>
      </Fragment>
    );
  };
  //close
  handleAddEventSidebar = () => {
    this.setState({
      created_at: "",
      date: "",
      end_time: "",
      id: "",
      show_position: "",
      start_time: "",
      title: "",
      user_id: "",
    });
    this.props.handleAddEventSidebar()
  };
  // ** Close BTN
  CloseBtn = () => (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => this.handleAddEventSidebar()}
    />
  );
  render() {
    const { handleAddEventSidebar, isOpen, t } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={() => this.handleAddEventSidebar()}
        className="sidebar-lg"
        contentClassName="p-0"
        modalClassName="modal-slide-in event-sidebar"
      >
        <ModalHeader
          className="mb-1"
          toggle={handleAddEventSidebar}
          close={this.CloseBtn()}
          tag="div"
        >
          <h5 className="modal-title">
            {this.props.sidebarType == "add" ? "Add Event" : "Edit Event"}
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
            <Label for="startDate">Date</Label>
            <Input
              name="title"
              id="title"
              placeholder="Title"
              defaultValue={this.state.date}
              type="date"
              required
              onChange={(e) => this.setState({ date: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label for="endDate">Start Time</Label>
            <Input
              name="title"
              id="title"
              placeholder="Title"
              defaultValue={this.state.start_time}
              type="time"
              required
              onChange={(e) => this.setState({ start_time: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Time</Label>
            <Input
              name="title"
              id="title"
              placeholder="Title"
              defaultValue={this.state.end_time}
              type="time"
              required
              onChange={(e) => this.setState({ end_time: e.target.value })}
            />
          </FormGroup>

          <FormGroup className="d-flex">{this.EventActions()}</FormGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddTutorEvents;
