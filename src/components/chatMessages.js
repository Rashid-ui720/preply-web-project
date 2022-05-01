import React from "react";
import { connect } from "react-redux";
import { TwilioService } from "../Redux/Actions/twilioActions";
import { BaseUrl } from "../utils/api_routes";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../utils/api_routes";
class ChatMessages extends React.Component {
  state = {
    allMessages: [],
    messagesLoader: true,
    sendBtn: true,
    textMessage: "",
    selectedChannel: null,
    PreviousMessageDate: "",
    paginator: null,
    previousMessagesLoader: false,
    selectedFile: null,
  };

  componentDidMount() {
    const { selectedChannel } = this.props;
  }
  componentDidUpdate(prevProps, prevState) {
    const { selectedChannel } = this.props;

    if (
      selectedChannel !== null &&
      prevProps.selectedChannel !== selectedChannel
    ) {
      this.getTwillioChat();
    }
  }

  getTwillioChat = async () => {
    this.setState({ messagesLoader: true });

    const { AuthData, selectedChannel } = this.props;
    const userID = AuthData.id ? AuthData.id : AuthData.user_id;
    TwilioService.getInstance()
      .getTwilioToken(userID)
      .then((token) => TwilioService.getInstance().getChatClient(token))

      .then((client) => client.getChannelByUniqueName(selectedChannel))
      .then((channel) => {
        channel.join();

        this.setState({ selectedChannel: channel });
        this.setChannelEvents(channel);
        channel.getMessages().then(async (paginator) => {
          const array = [];
          const totalMessages = paginator.items.length;

          let initialMessages = [];
          for (let i = 0; i < totalMessages; i++) {
            const message = paginator.items[i];

            let obj = {
              _id: message.sid,
              text: message.body,
              media: message.type == "media" ? message.media : null,
              createdAt: message.dateCreated,
              user: {
                _id: message.author,
                name: message.author,
              },
              received: true,
            };
            initialMessages.push(obj);
          }

          this.setState({
            allMessages: initialMessages,
            messagesLoader: false,
            paginator: paginator,
          });
          this.scrolltoBottom();
        });
      })
      .catch((err) => {
        console.error(" error", err);
      });
  };

  getPaginatorData = (NextPage) => {
    const { paginator } = this.state;
    if (NextPage == false) {
      this.setState({ previousMessagesLoader: true });
      paginator.prevPage().then(async (NewPaginator) => {
        const array = [];
        const totalMessages = NewPaginator.items.length;

        let initialMessages = [];
        let previousMessages = this.state.allMessages;
        for (let i = 0; i < totalMessages; i++) {
          const message = NewPaginator.items[i];

          let obj = {
            _id: message.sid,
            text: message.body,
            media: message.type == "media" ? message.media : null,
            createdAt: message.dateCreated,
            user: {
              _id: message.author,
              name: message.author,
            },
            received: true,
          };
          let check = false;
          for (let j = 0; j < previousMessages.length; j++) {
            if (previousMessages[j]._id == obj._id) {
              check = true;
            }
          }
          if (check == false) {
            initialMessages.push(obj);
          }
        }
        let NewMessages = initialMessages.concat(previousMessages);
        this.setState({
          allMessages: NewMessages,
          messagesLoader: false,
          paginator: NewPaginator,
          previousMessagesLoader: false,
        });
        //this.scrolltoNearTop();
      });
    } else if (NextPage == true) {
      paginator.nextPage().then(async (NewPaginator) => {
        const array = [];
        const totalMessages = NewPaginator.items.length;

        let initialMessages = [];
        for (let i = 0; i < totalMessages; i++) {
          const message = NewPaginator.items[i];

          let obj = {
            _id: message.sid,
            text: message.body,
            media: message.type == "media" ? message.media : null,
            createdAt: message.dateCreated,
            user: {
              _id: message.author,
              name: message.author,
            },
            received: true,
          };
          initialMessages.push(obj);
        }

        this.setState({
          allMessages: initialMessages,
          messagesLoader: false,
          paginator: NewPaginator,
        });
      });
    } else {
      //do nothing
    }
  };
  //handle messagePagination
  MessagePagination = (NextPage) => {
    const { paginator } = this.state;
    if (paginator !== null) {
      if (NextPage == false && paginator.hasPrevPage == true) {
        this.getPaginatorData(NextPage);
      } else if (NextPage == true && paginator.hasNextPage == true) {
        //this.getPaginatorData(NextPage);
      } else {
        //do nothing
      }
    }
  };

  setChannelEvents = (channel) => {
    channel.on("messageAdded", async (message) => {
      let obj = {
        _id: message.sid,
        text: message.body,
        media: message.type == "media" ? message.media : null,
        createdAt: message.dateCreated,
        user: {
          _id: message.author,
          name: message.author,
        },
        received: true,
        dummyMessage: false,
      };

      let previousMessages = this.state.allMessages;
      let check = false;
      for (let j = 0; j < previousMessages.length; j++) {
        if (previousMessages[j]._id == obj._id) {
          check = true;
        }
      }
      if (check == false) {
        previousMessages.push(obj);
      }

      this.setState({ allMessages: previousMessages });
      this.scrolltoBottom();
    });
    return channel;
  };

  //send the message
  sendMessageTwillio = async () => {
    const { AuthData, selectedChannel } = this.props;
    const userID = AuthData.id ? AuthData.id : AuthData.user_id;
    this.setState({ sendBtn: false });

    var textMessage = this.state.textMessage;
    this.setState({ textMessage: "" });
    if (this.state.selectedFile !== null) {
      const formData = new FormData();
      formData.append("file", this.state.selectedFile);
      this.state.selectedChannel.sendMessage(formData).then((res) => {
        this.setState({ textMessage: "", selectedFile: null });
        this.setState({ sendBtn: true });
        axios.post(api.sendMessageEmail, {
          sender_id: AuthData.id,
          channel_id: this.props.selectedChannel,
          role: AuthData.role,
          istext: 0
        });
      });
    } else {
      this.state.selectedChannel.sendMessage(textMessage).then((res) => {
        this.setState({ textMessage: "" });
        this.setState({ sendBtn: true });
        axios.post(api.sendMessageEmail, {
          sender_id: AuthData.id,
          channel_id: this.props.selectedChannel,
          role: AuthData.role,
          istext: 1,
          text: textMessage
          
        });
      });
    }
  };

  // Select FILE
  selectFile = () => {
    document.getElementById("file_input").click();
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // Download file
  DownloadFile = (media) => {
    toast.dismiss();
    toast(() => ToastContent("Please Wait..."), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
    });
    media.getContentTemporaryUrl().then(function (url) {
      // log media temporary URL
      toast.dismiss();

      axios({
        url: url,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", media.state?.contentType);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  loader = () => {
    return (
      <div
        className=" d-flex align-items-center justify-content-center  w-100 "
        style={{ height: "23rem" }}
      >
        <div
          className="spinner-border"
          style={{
            width: "2rem",
            height: "2rem",
            color: "#00b074",
          }}
          role="status"
        ></div>
      </div>
    );
  };

  noMessages = () => {
    return (
      <div
        className=" d-flex align-items-center justify-content-center  w-100 "
        style={{ height: "23rem" }}
      ></div>
    );
  };

  scrolltoBottom = () => {
    var objDiv = document.getElementById("messages_container");
    if (objDiv !== null) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  };
  scrolltoNearTop = () => {
    var objDiv = document.getElementById("messages_container");
    if (objDiv !== null) {
      objDiv.scrollTop = 200;
    }
  };

  checlScrollPosition = () => {
    var objDiv = document.getElementById("messages_container");
    var scrollPositon = objDiv.scrollTop;
    var scrollHeight = objDiv.scrollHeight;
    var clietnHieght = objDiv.clientHeight;
    if (scrollPositon == 0) {
      this.MessagePagination(false);
    }

    if (scrollHeight - scrollPositon == clietnHieght) {
      //this.MessagePagination(true);
    }
  };

  //fetch Message Date
  fetchDate = (message) => {
    let NewDate =
      message.createdAt.toString().split(" ")[0] +
      " " +
      message.createdAt.toString().split(" ")[1] +
      " " +
      message.createdAt.toString().split(" ")[2] +
      " " +
      message.createdAt.toString().split(" ")[3];
    if (this.state.PreviousMessageDate == NewDate) {
      return null;
    } else {
      this.setState({ PreviousMessageDate: NewDate });
      return NewDate;
    }
  };

  // show media message
  showMediaMessage = (media) => {
    return (
      <div
        className="bg-white  p-2 d-flex align-items-center"
        style={{ borderRadius: "0.35rem", cursor: "pointer" }}
        onClick={() => this.DownloadFile(media)}
      >
        <p className="m-0 font-size-3 mr-4">{media.state?.filename}</p>

        <i className="fas fa-download text-black" />
      </div>
    );
  };

  showMessages = () => {
    const { selectedChannel, AuthData, friendlyImage } = this.props;
    let DateCheck = "";
    let printDate = false;
    return this.state.allMessages.map((message, index) => {
      let NewDate =
        message.createdAt.toString().split(" ")[0] +
        " " +
        message.createdAt.toString().split(" ")[1] +
        " " +
        message.createdAt.toString().split(" ")[2] +
        " " +
        message.createdAt.toString().split(" ")[3];

      let Time =
        message.createdAt.toString().split(" ")[4].split(":")[0] +
        ":" +
        message.createdAt.toString().split(" ")[4].split(":")[1];
      if (DateCheck == NewDate) {
        printDate = false;
      } else {
        DateCheck = NewDate;
        printDate = true;
      }
      if (
        parseInt(message.user._id) == AuthData.id
          ? AuthData.id
          : AuthData.user_id
      ) {
        return (
          <div className="w-100" key={index}>
            <div className="w-100 d-flex justify-content-center">
              <p className="font-size-2  mb-0 p-0 mt-2">
                {printDate == true ? NewDate : ""}
              </p>
            </div>

            <div className="message-sent no-gutters mr-4">
              <div className="message">
                <div className="d-flex align-items-center">
                  <div
                    className={`chat-bubble chat-bubble--right ${
                      message.media !== null ? "p-1" : ""
                    }`}
                  >
                    {message.media !== null
                      ? this.showMediaMessage(message.media)
                      : message.text}
                  </div>
                  <img
                    className="profile-image chat-img"
                    src={
                      AuthData.user_img == "" || AuthData.user_img == null
                        ? `image/l3/png/userAvtar.webp`
                        : `${BaseUrl}/UserProfile/Images/${AuthData.user_img}`
                    }
                    alt=""
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "image/l3/png/userAvtar.webp";
                    }}
                  />
                </div>
                <div className="d-flex ">
                  <p
                    className="font-size-1  mb-0 p-0  ml-10"
                    style={{ marginTop: "-5px" }}
                  >
                    {Time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="w-100" key={index}>
            <div className="w-100 d-flex justify-content-center">
              <p className="font-size-2  mb-0 p-0 mt-2">
                {printDate == true ? NewDate : ""}
              </p>
            </div>
            <div className="row no-gutters ml-4">
              <div className="message">
                <div className="d-flex align-items-center">
                  <img
                    className="profile-image chat-img"
                    src={
                      friendlyImage == "" || friendlyImage == null
                        ? `image/l3/png/userAvtar.webp`
                        : `${BaseUrl}/UserProfile/Images/${friendlyImage}`
                    }
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className={`chat-bubble chat-bubble--left ${
                      message.media !== null ? "p-1" : ""
                    }`}
                  >
                    {message.media !== null
                      ? this.showMediaMessage(message.media)
                      : message.text}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <p
                    className="font-size-1  mb-0 p-0  mr-10"
                    style={{ marginTop: "-5px" }}
                  >
                    {Time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  };
  render() {
    const {
      selectedChannel,
      AuthData,
      selectedChannelFriendlyName,
      channelLoading,
      friendlyImage,
    } = this.props;

    return (
      <>
        {selectedChannel ? (
          <div className="col-lg-8 col-md-12 main-messgaes-container">
            <div className="settings-tray settings-tray-chat-header">
              <div className="friend-drawer no-gutters friend-drawer--grey ">
                <a
                  className="mr-5 chat-toogle-button"
                  data-toggle="collapse"
                  href="#chat-sidebar"
                  role="button"
                  aria-expanded="false"
                  aria-controls="chat-sidebar"
                >
                  <i className="fas fa-bars"></i>
                </a>
                <img
                  className="profile-image"
                  src={
                    friendlyImage == "" || friendlyImage == null
                      ? `image/l3/png/userAvtar.webp`
                      : `${BaseUrl}/UserProfile/Images/${friendlyImage}`
                  }
                  alt=""
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "image/l3/png/userAvtar.webp";
                  }}
                />
                <div className="text">
                  <h6>{selectedChannelFriendlyName}</h6>
                </div>
              </div>
              <div>
                {/* <li
              className="nav-item dropdown active"
              style={{ listStyle: "none" }}
            >
              <a
                className="nav-link  gr-toggle-arrow  "
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  className="fa fa-ellipsis-h cursor-pointer"
                  style={{ cursor: "pointer" }}
                ></i>
              </a>
              <ul
                className="gr-menu-dropdown dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ left: "-192px" }}
              >
                <li
                  className="drop-menu-item d-flex justify-content-between"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.DeleteChannel()}
                >
                  <a>Delete Chat</a>
                  <i className="fa fa-trash cursor-pointer text-red"></i>
                </li>
              </ul>
            </li> */}
              </div>
            </div>
            <div className="chat-panel">
              <div
                className="Messages-container pb-2"
                style={{ minHeight: "23rem" }}
                id="messages_container"
                onScroll={() => this.checlScrollPosition()}
              >
                {this.state.previousMessagesLoader == true ? (
                  <div
                    className=" d-flex align-items-center justify-content-center  w-100 "
                    style={{ height: "2rem" }}
                  >
                    <div
                      className="spinner-border"
                      style={{
                        width: "14px",
                        height: "14px",
                        color: "#00b074",
                      }}
                      role="status"
                    ></div>
                  </div>
                ) : null}
                {selectedChannel == null || this.state.messagesLoader == true
                  ? channelLoading == false && selectedChannel == null
                    ? this.noMessages()
                    : this.loader()
                  : this.state.allMessages.length == 0
                  ? this.noMessages()
                  : this.showMessages()}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="chat-box-tray">
                    <div className="message-input">
                      <input
                        type="text"
                        placeholder="Type your message here..."
                        value={
                          this.state.selectedFile !== null
                            ? this.state.selectedFile.name
                            : this.state.textMessage
                        }
                        disabled={
                          this.state.selectedFile !== null ? true : false
                        }
                        onChange={(e) =>
                          this.setState({ textMessage: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        id={"file_input"}
                        style={{ display: "none" }}
                        onChange={this.onFileChange}
                      />
                      <i
                        className="fa fa-paperclip ml-0 mr-3"
                        onClick={() => this.selectFile()}
                      />
                    </div>

                    <button
                      onClick={() => this.sendMessageTwillio()}
                      className="btn btn-primary message-btn "
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};

export default connect(mapStateToProps, null)(ChatMessages);
