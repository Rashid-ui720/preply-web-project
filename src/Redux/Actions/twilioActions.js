import axios from "axios";
import { Client } from "twilio-chat";
import { api } from "../../utils/api_routes";
export class TwilioService {
  static serviceInstance;
  static chatClient;

  constructor() {}

  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  //save channe to db
  async SaveChannelToDb(params) {
    axios
      .post(
        api.saveChannelInDb +
          "?student_user_id=" +
          params.student_user_id +
          "&tutor_user_id=" +
          params.tutor_user_id +
          "&channel_id=" +
          params.channel_id +
          "&channel_name=" +
          params.channel_name
      )
      .then((res) => {
      })
      .catch((err) => {
        console.error("save channel in db Error=====", err);
      });
  }

  //get channels from db
  async gtChannelsFromDb(params) {
    return axios.post(api.getChannelsTwilio, params).then((res) => res.data);
  }

  //get twilio token
  async getTwilioToken(user_id) {
    return axios
      .post(api.twilioToken, { identity: user_id })
      .then((Response) => Response.data.token);
  }

  async getChatClient(twilioToken, groupChat = false) {
    if (!TwilioService.chatClient && !twilioToken) {
      throw new Error("Twilio token is null or undefined");
    }
    if (groupChat && twilioToken) {
      return Client.create(twilioToken).then((client) => {
        TwilioService.chatClient = client;
        return TwilioService.chatClient;
      });
    } else if (!TwilioService.chatClient && twilioToken) {
      return Client.create(twilioToken).then((client) => {
        TwilioService.chatClient = client;
        return TwilioService.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  clientShutdown() {
    if (TwilioService.chatClient !== null) {
      TwilioService.chatClient?.shutdown();
      TwilioService.chatClient = null;
    }
  }

  addTokenListener(getToken) {
    if (!TwilioService.chatClient) {
      throw new Error("Twilio client is null or undefined");
    }
    TwilioService.chatClient.on("tokenAboutToExpire", () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });

    TwilioService.chatClient.on("tokenExpired", () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });
    return TwilioService.chatClient;
  }

  parseChannels(channels) {
    return channels.map(this.parseChannel);
  }

  parseChannel(channel) {
    return {
      id: channel.sid,
      name: channel.friendlyName,
      createdAt: channel.dateCreated,
      updatedAt: channel.dateUpdated,
      lastMessageTime:
        channel.lastMessage?.dateCreated ??
        channel.dateUpdated ??
        channel.dateCreated,
    };
  }

  parseMessages(messages) {
    return messages.map(this.parseMessage);
  }

  parseMessage(message) {
    return {
      _id: message.sid,
      text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: message.author,
      },
      received: true,
    };

    // if(message.media === null) {
    //     return {
    //       _id: message.sid,
    //       text: message.body,
    //       image: '',
    //       createdAt: message.dateCreated,
    //       user: {
    //         _id: message.author,
    //         name: message.author,
    //       },
    //       received: true,
    //     };
    //   } else {
    //      message.media.getContentTemporaryUrl().then(function (url) {
    //        console.error(url)
    //       // log media temporary URL
    //       // return {
    //       //   _id: message.sid,
    //       //   text: message.body,
    //       //   image: url,
    //       //   createdAt: message.dateCreated,
    //       //   user: {
    //       //     _id: message.author,
    //       //     name: message.author,
    //       //   },
    //       //   received: true,
    //       // };
    //     })
    //   }
  }
}
