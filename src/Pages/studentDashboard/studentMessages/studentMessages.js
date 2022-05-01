import React from "react";
import ChatMessages from "../../../components/chatMessages";
import ChatSideBar from "../../../components/chatSideBar";
import { connect } from "react-redux";
import { TwilioService } from "../../../Redux/Actions/twilioActions";
import "../../../cssmodule/chatStyles.css";

class StudentMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      channelGet: [],
      selectedChannel: null,
      selectedChannelFriendlyName: null,
      channelLoading: true,
      friendlyImage: null,
    };
  }

  //get params frm the url if user comes to chat from another screen
  async componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const queryString = new Buffer(window.location.search, "base64").toString(
      "ascii"
    );
    const urlParams = new URLSearchParams(queryString);
    var query = urlParams.get("query");
    if (query !== null) {
      let UniqueName = urlParams.get("uniqueName").trim();
      let ChannelfriendlyName = urlParams.get("friendlyName").trim();
      this.setState({
        selectedChannel: UniqueName,
        selectedChannelFriendlyName: ChannelfriendlyName.split("_and_")[0],
      });
      //get the instructor and student id from the param
      let instructor_id = UniqueName.split("_")[0];
      let student_id = UniqueName.split("_")[1];

      //if user comes from other url then channel check will run
      this.ChannelCheck(instructor_id, student_id, ChannelfriendlyName);
    } else {
      this.setState({ selectedChannel: null });
      //get channels list
      this.getTwillioChannelList();
    }
  }

  //channelCheck If user dd to have channel the create the new and join both the users in it
  ChannelCheck = (instructor_id, student_id, channelFriendlyName) => {
    const { AuthData } = this.props;
    const channel_id = instructor_id + "_" + student_id;
    const user_id = AuthData.id ? AuthData.id : AuthData.user_id;

    TwilioService.getInstance()
      .getTwilioToken(user_id)
      .then((token) => TwilioService.getInstance().getChatClient(token))

      .then((client) => {
        client
          .getChannelByUniqueName(channel_id)
          .then(async (channel) => {
            if (channel.channelState.status !== "joined") {
              channel.join();
            }

            let ChatState = {
              status: true,
              uniqueName: channel_id,
            };
            this.getTwillioChannelList();
          })
          .catch((err) => {
            client
              .createChannel({
                uniqueName: channel_id,
                friendlyName: channelFriendlyName,
              })
              .then(async (channel) => {
                if (channel.channelState.status !== "joined") {
                  channel.join();
                }

                this.addMember(instructor_id, channel_id);
                let params = {
                  student_user_id: user_id,
                  tutor_user_id: parseInt(instructor_id),
                  channel_id: channel.sid,
                  channel_name: channel_id,
                };
                await TwilioService.getInstance().SaveChannelToDb(params);
                //get channles list after joining other user
                this.getTwillioChannelList();
              })
              .catch((err) => {
                console.error(err);
              });
          });
      });
  };

  //AddMemebr
  addMember = (join_user, channelUniqueName) => {
    const memeberAdd = parseInt(join_user);
    const channelName = channelUniqueName;
    if (true) {
      TwilioService.getInstance()
        .getTwilioToken(memeberAdd)
        .then((token) => TwilioService.getInstance().getChatClient(token, true))
        .then(() => {
          TwilioService.getInstance()
            .getChatClient()
            .then((client) => {
              client
                .getChannelByUniqueName(channelName)
                .then((channel) => {
                  channel
                    .join()
                    .then((res) => {
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                })
                .catch(() => {
                  console.error("Error==");
                });
            });
        });
    }
  };

  //get the channle list fo the twilio chat
  getTwillioChannelList = async () => {
    this.setState({ channelLoading: true });
    const { AuthData } = this.props;
    const user_id = AuthData.id ? AuthData.id : AuthData.user_id;
    TwilioService.getInstance()
      .getTwilioToken(user_id)
      .then((token) => TwilioService.getInstance().getChatClient(token))
      .then((client) => {
        client.getUserChannelDescriptors().then(async (list) => {
          let UserChannels = [];
          let params = new FormData();
          //this will get channles that are only related to the user
          for (let i = 0; i < list.items.length; i++) {
            if (
              parseInt(list.items[i].createdBy) == user_id ||
              parseInt(list.items[i].uniqueName.split("_")[0]) == user_id ||
              parseInt(list.items[i].uniqueName.split("_")[1]) == user_id
            ) {
              UserChannels.push(list.items[i]);
            }
            params.append(`channels[${i}]`, list.items[i].sid);
          }
          if (list.items.length == 0) {
            params.append(`channels[${1}]`, "sadasdadasd");
          }
          let dbChannels = [];
          await TwilioService.getInstance()
            .gtChannelsFromDb(params)
            .then((res) => {
              dbChannels = res;
              this.setState({
                SelectedChannelsFromDb: res,
                channelLoading: false,
              });
            });
          this.setState({
            channelGet: UserChannels,
            selectedChannel:
              UserChannels.length > 0 ? UserChannels[0].uniqueName : null,
            selectedChannelFriendlyName: this.getChannelName(
              UserChannels[0]?.uniqueName,
              dbChannels
            ),
            friendlyImage: this.getChannelImage(
              UserChannels[0]?.uniqueName,
              dbChannels
            ),
          });
        });
      });
  };

  //getChannelname
  getChannelName = (channelUniqueName, dbChannels) => {
    const { AuthData } = this.props;

    let channelName = "";
    if (dbChannels.length > 0) {
      dbChannels.map((Dbchannel) => {
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
  getChannelImage = (channelUniqueName, dbChannels) => {
    const { AuthData } = this.props;

    let channelImg = "";
    if (dbChannels.length > 0) {
      dbChannels.map((Dbchannel) => {
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

  //Select the channle
  selectChannel = (uniqueId, friednlyName, friendlyImage) => {
    this.setState({
      selectedChannel: uniqueId,
      selectedChannelFriendlyName: friednlyName,
      friendlyImage: friendlyImage,
    });
  };
  render() {
    return (
      <div
        className="student-dashboard-container mt-25 mt-lg-27 mt-md-29"
        id="dashboard-body"
      >
        <div className="student-dashboard-content student-dashboard-chat-content">
          {/* chat start */}
          <div className="">
            <div className="row no-gutters">
              {/* chat side bar or chat list */}
              <ChatSideBar
                channels={this.state.channelGet}
                channelLoading={this.state.channelLoading}
                selectChannel={this.selectChannel}
                selectedChannel={this.state.selectedChannel}
                SelectedChannelsFromDb={this.state.SelectedChannelsFromDb}
              />
              <ChatMessages
                selectedChannel={this.state.selectedChannel}
                selectedChannelFriendlyName={
                  this.state.selectedChannelFriendlyName
                }
                friendlyImage={this.state.friendlyImage}
                channelLoading={this.state.channelLoading}
                SelectedChannelsFromDb={this.state.SelectedChannelsFromDb}
              />
            </div>
          </div>
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

export default connect(mapStateToProps, null)(StudentMessages);
