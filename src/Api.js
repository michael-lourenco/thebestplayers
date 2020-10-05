import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default {
  fbPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  },
  addUser: async (u) => {
    await db.collection("users").doc(u.id).set(
      {
        name: u.name,
        avatar: u.avatar,
      },
      { merge: true }
    );
  },
  getContactList: async (userId) => {
    let list = [];

    let results = await db.collection("users").get();

    results.forEach((result) => {
      let data = result.data();
      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });

    return list;
  },
  addNewChat: async (user, user2) => {
    let newChat = await db.collection("chats").add({
      messages: [],
      users: [user.id, user2.id],
    });

    db.collection("users")
      .doc(user.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user2.name,
          image: user2.avatar,
          with: user2.id,
        }),
      });

    db.collection("users")
      .doc(user2.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user.name,
          image: user.avatar,
          with: user.id,
        }),
      });
  },
  onChatList: (userId, setCahtList) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();

          if (data.chats) {
            let chats = [...data.chats];
            chats.sort((a, b) => {
              if (a.lastMessageDate === undefined) {
                return -1;
              }
              if (b.lastMessageDate === undefined) {
                return -1;
              }
              if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                return 1;
              } else {
                return -1;
              }
            });

            setCahtList(data.chats);
          }
        }
      });
  },
  onChatContent: (chatId, setList, setUsers) => {
    return db
      .collection("chats")
      .doc(chatId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          setList(data.messages);
          setUsers(data.users);
        }
      });
  },
  sendMessage: async (chatData, userId, type, body, users) => {
    let now = new Date();

    db.collection("chats")
      .doc(chatData.chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          type,
          author: userId,
          body,
          date: now,
        }),
      });

    for (let i in users) {
      let u = await db.collection("users").doc(users[i]).get();
      let uData = u.data();
      if (uData.chats) {
        let chats = [...uData.chats];

        for (let e in chats) {
          if (chats[e].chatId === chatData.chatId) {
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
          }
        }
        await db.collection("users").doc(users[i]).update({
          chats,
        });
      }
    }
  },
  addRank: async (u) => {
    let now = new Date();
    await db.collection("rank").doc(u.summonerId).set(
      {
        name: u.summonerName,
        leagueId: u.leagueId,
        leaguePoints: u.leaguePoints,
        losses: u.losses,
        queueType: u.queueType,
        rank: u.rank,
        // region: u.region,
        summonerId: u.summonerId,
        summonerName: u.summonerId,
        tier: u.tier,
        veteran: u.veteran,
        wins: u.wins,
        date: now,
      },
      { merge: true }
    );
  },
  getRankList: async() => {
    let list = [];

    let results = await db.collection("rank").get();

    results.forEach((result) => {
      let data = result.data();
      
        list.push({
          name: data.name,
          leagueId: data.leagueId,
          leaguePoints: data.leaguePoints,
          losses: data.losses,
          queueType: data.queueType,
          rank: data.rank,
          // region: data.region,
          summonerId: data.summonerId,
          summonerName: data.summonerName,
          tier: data.tier,
          veteran: data.veteran,
          wins: data.wins,
          date: data.date,
        });
      
    });

    return list;
  },
  onRankList: (setRankList) => {
    return db
      .collection("rank")
      .doc()
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();

          if (data.rank) {
            let rank = [...data.rank];
            rank.sort((a, b) => {
              if (a.date === undefined) {
                return -1;
              }
              if (b.date === undefined) {
                return -1;
              }
              if (a.date.seconds < b.date.seconds) {
                return 1;
              } else {
                return -1;
              }
            });

            setRankList(data.rank);
          }
        }
      });
  },

};
