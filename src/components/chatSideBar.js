import React from "react";
import { BaseUrl } from "../utils/api_routes";
import { connect } from "react-redux";
import { TwilioService } from "../Redux/Actions/twilioActions";
class ChatSideBar extends React.Component {
  state = { latestMessages: [] };
  componentDidMount() {
    const { channels } = this.props;
    let latestMessages = [];
    for (let i = 0; i < channels.length; i++) {
      latestMessages.push({ uniqueId: channels[i].uniqueName, message: null });
    }

    this.setState({ latestMessages: latestMessages });
    for (let i = 0; i < channels.length; i++) {
      this.getLatestMessage(channels[i].uniqueName);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { channels } = this.props;

    if (prevProps.channels !== channels) {
      let latestMessages = [];
      for (let i = 0; i < channels.length; i++) {
        latestMessages.push({
          uniqueId: channels[i].uniqueName,
          message: null,
        });
      }

      this.setState({ latestMessages: latestMessages });
      for (let i = 0; i < channels.length; i++) {
        this.getLatestMessage(channels[i].uniqueName);
      }
    }
  }
  getLatestMessage = async (channelUniqueName) => {
    const { AuthData } = this.props;
    const userID = AuthData.id ? AuthData.id : AuthData.user_id;
    let messageObj = {};
    await TwilioService.getInstance()
      .getTwilioToken(userID)
      .then((token) => TwilioService.getInstance().getChatClient(token))
      .then((client) => client.getChannelByUniqueName(channelUniqueName))
      .then((channel) => {
        channel.join();
        this.setChannelEvents(channel);
        channel.getMessages().then(async (paginator) => {
          const message = paginator.items[paginator.items.length - 1];
          let obj = {};
          if (message == undefined) {
            obj = {
              _id: "",
              text: "",
              media: null,
              createdAt: new Date(),
              user: {
                _id: "",
                name: "",
              },
              received: true,
            };
          } else {
            obj = {
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
          }

          let latetmessages = this.state.latestMessages;
          if (latetmessages.length > 0) {
            for (let i = 0; i < latetmessages.length; i++) {
              if (latetmessages[i].uniqueId == channel.uniqueName) {
                latetmessages[i].message = obj;
              }
            }
          } else {
            latetmessages.push({ uniqueId: channel.uniqueName, message: obj });
          }

          latetmessages.push({ uniqueId: channelUniqueName, message: obj });
          this.setState({ latestMessages: latetmessages });
        });
      })
      .catch((err) => {
        console.error(" error", err);
      });
  };

  //channle events
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

      let latetmessages = this.state.latestMessages;
      if (latetmessages.length > 0) {
        for (let i = 0; i < latetmessages.length; i++) {
          if (latetmessages[i].uniqueId == channel.uniqueName) {
            latetmessages[i].message = obj;
          }
        }
      } else {
        latetmessages.push({ uniqueId: channel.uniqueName, message: obj });
      }

      this.setState({ latestMessages: latetmessages });
    });
  };

  //render the channel
  renderLatestMessagee = (channelUniqueName) => {
    for (let i = 0; i < this.state.latestMessages.length; i++) {
      if (this.state.latestMessages[i].uniqueId == channelUniqueName) {
        return this.state.latestMessages[i].message == null
          ? ""
          : this.state.latestMessages[i].message.media !== null
          ? "File"
          : this.state.latestMessages[i].message.text;
      }
    }
  };

  //render latest messageDate
  renderLatestMessageDate = (channelUniqueName) => {
    for (let i = 0; i < this.state.latestMessages.length; i++) {
      if (this.state.latestMessages[i].uniqueId == channelUniqueName) {
        let dateTime = null;
        if (this.state.latestMessages[i].message == null) {
          dateTime = "";
        } else {
          dateTime =
            this.state.latestMessages[i].message.createdAt
              .toString()
              .split(" ")[1] +
            " " +
            this.state.latestMessages[i].message.createdAt
              .toString()
              .split(" ")[2];
        }

        return dateTime;
      }
    }
  };

  //render latest message Time
  renderLatestMessageTime = (channelUniqueName) => {
    for (let i = 0; i < this.state.latestMessages.length; i++) {
      if (this.state.latestMessages[i].uniqueId == channelUniqueName) {
        let dateTime = null;
        if (this.state.latestMessages[i].message == null) {
          dateTime = "";
        } else {
          dateTime =
            this.state.latestMessages[i].message.createdAt
              .toString()
              .split(" ")[4]
              .split(":")[0] +
            ":" +
            this.state.latestMessages[i].message.createdAt
              .toString()
              .split(" ")[4]
              .split(":")[1];
        }

        return dateTime;
      }
    }
  };

  //getChannelname
  getChannelName = (channelUniqueName) => {
    const { SelectedChannelsFromDb, AuthData } = this.props;

    let channelName = "";
    if (SelectedChannelsFromDb.length > 0) {
      SelectedChannelsFromDb.map((Dbchannel) => {
        if (Dbchannel?.channel_name == channelUniqueName) {
          if (AuthData.role == "instructor") {
            channelName = Dbchannel?.student_channel.fname;
          } else {
            channelName = Dbchannel?.instructor_channel.fname;
          }
        }
      });
    }
    return channelName;
  };

  //get channel image
  getChannelImage = (channelUniqueName) => {
    const { SelectedChannelsFromDb, AuthData } = this.props;

    let channelImg = "";
    if (SelectedChannelsFromDb.length > 0) {
      SelectedChannelsFromDb.map((Dbchannel) => {
        if (Dbchannel?.channel_name == channelUniqueName) {
          if (AuthData.role == "instructor") {
            channelImg = Dbchannel?.student_channel.user_img;
          } else {
            channelImg = Dbchannel?.instructor_channel.user_img;
          }
        }
      });
    }
    return channelImg;
  };

  render() {
    const {
      channelLoading,
      channels,
      AuthData,
      selectedChannel,
    } = this.props;
    return (
      <div
        className="col-lg-4 col-md-6 chat-side-bar border-right chat-list-container"
        id="chat-sidebar"
      >
        <div className="settings-tray settings-tray-sidebar">
            <img
              className="profile-image"
              src={
                AuthData.user_img == null
                  ? `image/l3/png/userAvtar.webp`
                  : `${BaseUrl}/UserProfile/Images/${AuthData.user_img}`
              }
              alt=""
              style={{ objectFit: "cover" }}
              onError={(e)=>{e.target.onerror = null; e.target.src="image/l3/png/userAvtar.webp"}}
            />
            <div className="search-box settings-tray--right ml-auto">
              <div className="input-wrapper">
                <i className="fas fa-search"></i>
                <input placeholder="Search here" type="text" />
              </div>
            </div>
            <a
              className="ml-auto chat-toogle-button"
              data-toggle="collapse"
              href="#chat-sidebar"
              role="button"
              aria-expanded="false"
              aria-controls="chat-sidebar"
            >
              <i className="fas fa-times"></i>
            </a>
          </div>

        <div className="chat-list">
              {channelLoading == true ? (
                <div
                  className=" d-flex align-items-center justify-content-center  w-100 "
                  style={{ height: "22rem" }}
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
              ) : channels.length == 0 ? (
                <div
                  className=" d-flex align-items-center justify-content-center  w-100 "
                  style={{ height: "22rem" }}
                >
                  <h4 className="font-size-3">No messages Available</h4>
                </div>
              ) : (
                channels.map((channel, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        this.props.selectChannel(
                          channel.uniqueName,
                          this.getChannelName(channel.uniqueName),
                          this.getChannelImage(channel.uniqueName)
                        )
                      }
                    >
                      <div
                        className={`friend-drawer friend-drawer--onhover ${
                          selectedChannel == channel.uniqueName
                            ? "selectedChat "
                            : ""
                        }`}
                      >
                        <img
                          className="profile-image"
                          src={
                            this.getChannelImage(channel.uniqueName) == '' || this.getChannelImage(channel.uniqueName) == null
                              ? `image/l3/png/userAvtar.webp`
                              : `${BaseUrl}/UserProfile/Images/${this.getChannelImage(
                                  channel.uniqueName
                                )}`
                          }
                          alt=""
                          style={{ objectFit: "cover" }}
                          onError={(e)=>{e.target.onerror = null; e.target.src="image/l3/png/userAvtar.webp"}}
                        />
                        <div className="text">
                          <h6>{this.getChannelName(channel.uniqueName)}</h6>
                          <p className="text-muted">
                            {channel.messagesCount == 0
                              ? "No  messages yet"
                              : this.renderLatestMessagee(channel.uniqueName)}
                          </p>
                        </div>
                        <span className="time text-muted small font-size-2 d-flex justify-content-center flex-column">
                          <span>
                            {channel.messagesCount == 0
                              ? ""
                              : this.renderLatestMessageDate(
                                  channel.uniqueName
                                )}
                          </span>
                          <span>
                            {this.renderLatestMessageTime(channel.uniqueName)}
                          </span>
                        </span>
                      </div>
                      <hr />
                    </div>
                  );
                })
              )}
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};

export default connect(mapStateToProps, null)(ChatSideBar);
