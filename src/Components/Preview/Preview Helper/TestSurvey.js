import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  PanResponder,
  Dimensions,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import { Input, AirbnbRating, Rating, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProgressBar from "react-native-progress/Bar";

import UserInactivity from "react-native-user-inactivity";
import Error from "../Components/Error";
import axios from "axios";
import Answer from "../Components/Answer";
import Button from "../Components/Button";
import Faces from "../Components/Faces";
import Stars from "../Components/Stars";
import FacesAnswers from "../Components/FacesAnswers";
import ThumbsAnswers from "../Components/ThumbsAnswers";
import YesNoAnswer from "../Components/YesNoAnswers";
import HeartsAnswers from "../Components/HeartsAnswers";

import NoSurvey from "../Components/NoSurvey";
import NetInfo from "@react-native-community/netinfo";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import moment from "moment";
import Suggestion from "../Components/Suggestion";
import IconCross from "react-native-vector-icons/Entypo";
import Uuid from "react-native-uuid";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Agree,
  Disagree,
  Great,
  NeitherAgreeNorDisagree,
  Okay,
  OkayThumbs,
  Poor,
  Star1,
  Star2,
  Star3,
  Star4,
  Star5,
  StronglyAgree,
  Stronglydisagree,
  Thumbsdown,
  Thumbsup,
  Heart1,
  Heart2,
  Heart3,
  Heart4,
  Heart5,
  Yes,
  No,
  Maybe,
  facesAnswerType,
  thumbsAnswerTpes,
  YesorNoAnswerTpes,
  LikertAnswerTypes,
  StarsAnswersTypes,
  HeartsAnswersTypes,
} from "../Helper/AnswerType";

import Single from "../Components/Single";
// import Stars from '../Components/Stars';
import { sub } from "react-native-reanimated";
import Likert from "../Components/Likert";
import StarsAnswers from "../Components/StarsAnswer";
import LikertsAnswers from "../Components/LikertAnswers";
import Choice from "../Components/Choice";
import Loading from "../Components/Loading";
const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;

Icon.loadFont();
IconCross.loadFont();

class Survey extends React.Component {
  state = {
    companyName: "",
    highValue: null,
    surveyLength: 0,
    surveyNumber: 0,
    startTime: "",
    survey: null,
    config: {},
    uuid: "",
    timeEqualSurveys: [],
    loading: false,
    isConnected: true,
    //Response State
    multiple: [],
    userResponse: [],
    facesAnswer: null,
    visible: false,

    //Response State

    active: true,
    timer: 5000,

    responses: [],

    index: 0,

    data: [],
    progress: 0,
    write: "Write Something",
    pageWidth: Dimensions.get("window").width,
    pageHeight: Dimensions.get("window").height,
  };

  setResponses = (
    surveyUid,
    surveyName,
    questionId,
    questionText,
    answerText,
    answerId,
    parentQuestionId,
    questionType,
    timeStamp,
    userId
  ) => {
    this.state.responses.push({
      survey_uuid: surveyUid,
      survey_name: surveyName,
      survey_category: "kiosk",
      question_id: questionId,
      question_text: questionText,
      answer_text: answerText,
      answer_id: answerId,
      parent_question_id: parentQuestionId,
      question_type: questionType,
      timestamp: timeStamp,
      user_uuid: userId,

      category_id: "1",
      category_name: "kiosk",
      media: {
        type: "video",
        source: "url",
        viewed: "true",
      },
    });
  };

  getNewDimensions = (event) => {
    this.setState({
      pageHeight: Dimensions.get("window").height,
      pageWidth: Dimensions.get("window").width,
    });
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  submmit = (value) => {
    const { facesAnswer } = this.state;

    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds();

    let timestamp = `${hours}${min}${sec}`;

    if (this.state.facesAnswer != null) {
      this.uploadResponse();
    }
  };
  _update = (text, index, id) => {
    const newArray = [...this.state.data];
    newArray[index].answerWithId = [
      {
        answer_id: id,
        answer_text: text,
      },
    ];
    this.setState({ available: newArray });
  };
  next = (value, index) => {
    this.setState({ visible: false, highValue: null });

    console.log(value, "REsponse");
    let foundR = this.state.responses.some(
      (el) => el.question_id === value.question_id
    );
    console.log(foundR, "gsgsgsgs");
    console.log("Hihe", this.state.highValue);
    this.setState({ highValue: value });
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds();

    let timestamp = `${hours}${min}${sec}`;
    const { facesAnswer, data, progress, surveyLength } = this.state;
    console.log(facesAnswer, "fafafafaHello");

    let length2 = data.length;
    if (this.state.facesAnswer != null && facesAnswer.length === undefined) {
      if (value.sub_questions != undefined) {
        value.sub_questions.map((it) => {
          const found = data.some((el) => el.question_id === it.question_id);
          it.parent_question_id = value.question_id;

          if (!found) {
            if (facesAnswer.id === it.answer_id_link) {
              this.state.data.splice(index + 1, 0, it);
              console.log(this.state.data, "CCCCCCCC");
            } else if (it.answer_id_link === 0) {
              this.state.data.splice(index + 1, 0, it);
              console.log(this.state.data, "DDDDDDDD");
            }
          }
        });
      }

      if (value.sub_questions === undefined || length2 === data.length) {
        this.setState({
          surveyNumber: this.state.surveyNumber + 1,
          progress: progress + 1 / surveyLength,
        });
      }
    }
    if (index != data.length - 1) {
      data[index].answerWithId = facesAnswer;

      this.setState({
        active: true,
        index: index + 1,
        facesAnswer: null,
        multiple: [],
      });
      if (data[index + 1].answerWithId === undefined) {
        this.setState({ facesAnswer: null });
      }

      if (facesAnswer.length) {
        facesAnswer.map((item) => {
          console.log(item, "GGGAFfafafafaf");
          value.sub_questions.map((it) => {
            const found = data.some((el) => el.question_id === it.question_id);
            it.parent_question_id = value.question_id;

            if (!found) {
              if (item.answer_id === it.answer_id_link) {
                this.state.data.splice(index + 1, 0, it);
              } else if (it.answer_id_link === 0) {
                this.state.data.splice(index + 1, 0, it);
              }
            }
          });
          console.log(this.state.data, "Chalo naa Response");
        });
        if (value.sub_questions === undefined || length2 === data.length) {
          this.setState({
            surveyNumber: this.state.surveyNumber + 1,
            progress: progress + 1 / surveyLength,
          });
        }
        let parentId = value.parent_question_id ? value.parent_question_id : 0;

        for (let item of facesAnswer) {
          console.log(item, "Hello");
          data[index].answerWithId = facesAnswer;
        }
        this.setState({
          active: true,
          index: index + 1,
          // facesAnswer: null,
        });
      }
    }
    console.log(data, "Hesss");
    if (index === data.length - 1) {
      data[index].answerWithId = facesAnswer;
      if (facesAnswer.length) {
        console.log("GGGFSFSAF", facesAnswer);

        facesAnswer.map((item) => {
          console.log(item, "FAcesArray");
          if (value.sub_questions != undefined) {
            value.sub_questions.map((it) => {
              const found = data.some(
                (el) => el.question_id === it.question_id
              );
              it.parent_question_id = value.question_id;

              if (!found) {
                if (item.answer_id === it.answer_id_link) {
                  this.state.data.splice(index + 1, 0, it);
                } else if (it.answer_id_link === 0) {
                  this.state.data.splice(index + 1, 0, it);
                }
              }
            });
          }
          console.log(this.state.data, "Chalo naa Response");
        });

        for (let item of facesAnswer) {
          data[index].answerWithId = facesAnswer;
        }
      }
      this.uploadResponse();
    }
  };

  previous = (value, index) => {
    let high = this.state.data[index - 1].answerWithId;

    this.setState({ highValue: high, facesAnswer: high });

    if (value.parent_question_id != undefined) {
      var removeIndex2 = this.state.data
        .map(function (item) {
          return item.question_id;
        })
        .indexOf(value.question_id);

      this.state.data.splice(removeIndex2, 1);
    }

    // remove object
    console.log("New state", this.state.data);
    if (index != 0) {
      this.setState({
        index: index - 1,
      });
    }
    if (value.parent_question_id === undefined) {
      this.setState({
        surveyNumber: this.state.surveyNumber - 1,
        progress: this.state.progress - 1 / this.state.surveyLength,
      });
    }
  };
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  apiCall = async () => {
    this.setState({
      responses: [],
      data: [],
      multiple: [],
      index: 0,
      highValue: null,
      surveyLength: 0,
      surveyNumber: 0,
      startTime: "",
      survey: null,
      config: null,
      uuid: null,
      timeEqualSurveys: [],
      facesAnswer: null,
      visible: false,
    });

    NetInfo.fetch().then((isConnected) => {
      console.log("gagag");
      this.setState({ loading: true });
      if (isConnected.isConnected) {
        // AsyncStorage.getItem('WithoutInternetResponse').then((item) => {
        //   if (item != null) {
        //     console.log(item, 'Hello');
        //   }
        // });

        // this.removeItemValue('response');
        AsyncStorage.getItem("user").then((user) => {
          let userdetails = JSON.parse(user);
          console.log(userdetails, "User Details");

          this.setState({ uuid: userdetails });

          AsyncStorage.getItem("config").then((config) => {
            let configuration = JSON.parse(config);
            console.log(configuration, "Test");
            this.setState({ config: configuration });

            configuration.survey_list.map((el) => {
              console.log(el, "Survey List");

              var hours = new Date().getHours(); //To get the Current Hours
              var min = new Date().getMinutes(); //To get the Current Minutes
              var sec = new Date().getSeconds(); //To get the Current Seconds
              this.setState({ startTime: `${hours}${min}${sec}` });
              let currentTime = moment(`${hours}:${min}:${sec}`, "hh:mm");

              var days = [0, 1, 2, 3, 4, 5, 6];
              var dayName = days[new Date().getDay()];
              console.log(dayName, "DAyName");
              // this.getCompanyName();
              for (let item of el.schedules) {
                let starttime = moment(item.time_start, "hh:mm");
                let endtime = moment(item.time_end, "hh:mm");

                if (
                  currentTime.isBefore(endtime) &&
                  currentTime.isAfter(starttime) &&
                  item.day === dayName
                ) {
                  this.state.timeEqualSurveys.push({ surveyuid: el.uuid });
                }
              }
            });

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
              "Authorization",
              `Bearer ${userdetails.access_token}`
            );
            myHeaders.append(
              "Cookie",
              `XSRF-TOKEN=${userdetails.access_token}`
            );

            var raw = "";
            const { timeEqualSurveys } = this.state;
            var requestOptions = {
              method: "GET",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            console.log(
              Math.floor(Math.random() * timeEqualSurveys.length),
              "Time Equal Surveys"
            );
            let survey =
              timeEqualSurveys[
                Math.floor(Math.random() * timeEqualSurveys.length)
              ];
            console.log(
              '"b79e983f-e4f4-4e0e-99e3-3ff7d3796c1f"',
              survey.surveyuid
            );
            fetch(
              `https://services.censuble.com/api/v1/survey/${survey.surveyuid}`,

              requestOptions
            )
              .then((response) => response.text())

              .then((result) => {
                this.setState({ loading: false });
                let response = JSON.parse(result);
                console.log("Survey", response.data.survey.questions);
                this.setState({ survey: response.data.survey });
                AsyncStorage.setItem(
                  "surveyConfig",
                  JSON.stringify(response.data.survey)
                );
                AsyncStorage.setItem(
                  "response",
                  JSON.stringify(response.data.survey.questions)
                );

                let survey = response.data.survey.questions;
                this.setState({ data: survey, surveyLength: survey.length });

                if (this.state.isConnected) {
                  let date = Date().toLocaleString();
                  AsyncStorage.setItem("lastSync", date);
                }
              })
              .then((result) => {
                this.setState({
                  progress: 1 / this.state.data.length,
                });
              });
          });
        });
      } else {
        try {
          AsyncStorage.getItem("surveyConfig").then((survey) => {
            this.setState({ survey: JSON.parse(survey) });
          });
          AsyncStorage.getItem("user")
            .then((user) => {
              let userdetails = JSON.parse(user);
              console.log(userdetails, "User Details");

              this.setState({ uuid: userdetails });
            })
            .then(() => {
              AsyncStorage.getItem("config").then((config) => {
                let configuration = JSON.parse(config);
                console.log(configuration, "Test");
                this.setState({ config: configuration });
              });
            });
          console.log("Hello");
          AsyncStorage.getItem("response")
            .then((sur) => {
              console.log(sur, "Hello Dogar");
              this.setState({
                data: JSON.parse(sur),
                progress: 1 / JSON.parse(sur).length,
                surveyLength: JSON.parse(sur).length,
              });
            })
            .then((result) => {
              this.setState({
                progress: 1 / this.state.data.length,
              });
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  uploadResponse = async () => {
    // AsyncStorage.setItem('WithoutInternetResponse', JSON.stringify([])),
    this.setState({ data: [] });

    const { uuid, data, companyName } = this.state;
    console.log(
      "FFArrra",
      this.state.survey,
      uuid,
      this.state.config,
      companyName
    );
    let responses = [];
    data.map((value) => {
      console.log(value, "Hfdahjfhajfh Id");
      if (value.answerWithId.length) {
        for (let item of value.answerWithId) {
          responses.push({
            survey_uuid: this.state.survey.uuid,
            survey_name: this.state.survey.name,
            survey_category: "0",
            question_id: value.question_id,
            answer_text: item.answer,
            answer_id: item.answer_id,

            parent_question_id: value.parent_question_id
              ? value.parent_question_id
              : 0,
            question_text: value.question_text,
            question_type: value.answer_type,
            timestamp: Math.ceil(new Date().getTime() / 1000),
            user_uuid: this.state.uuid.user.uuid,
            transaction_id: Uuid.v4(),
            testmode: false,

            category_id: "0",
            category_name: "kiosk",
            media: {
              type: "video",
              source: "url",
              viewed: "true",
            },
          });
        }
      } else {
        responses.push({
          survey_uuid: this.state.survey.uuid,
          survey_name: this.state.survey.name,
          survey_category: "0",
          question_id: value.question_id,
          answer_text: value.answerWithId.answer,
          answer_id: value.answerWithId.id,

          parent_question_id: value.parent_question_id
            ? value.parent_question_id
            : 0,
          question_text: value.question_text,
          question_type: value.answer_type,
          timestamp: Math.ceil(new Date().getTime() / 1000),
          user_uuid: this.state.uuid.user.uuid,
          transaction_id: Uuid.v4(),
          testmode: false,
          category_id: "0",
          category_name: "kiosk",
          media: {
            type: "video",
            source: "url",
            viewed: "true",
          },
        });
      }
    });

    let data2 = {
      config: {
        device_uuid: this.state.config.uuid,
        device_name: this.state.config.name,
        device_location: this.state.config.location_name,
        company_name: this.state.config.company_name,
        company_uuid: this.state.config.company_uuid,
      },
      responses: responses,
      outage: {
        records: responses.length,
        start_timestamp: Math.ceil(new Date().getTime() / 1000),
      },
    };
    console.log(data2, "Final Resonpese");
    NetInfo.fetch().then((isConnected) => {
      console.log("Fazzy");
      if (isConnected.isConnected) {
        console.log("Coeere");
        AsyncStorage.getItem("WithoutInternetResponse").then((item) => {
          console.log(JSON.parse(item), "GGGGGGGadad");
          if (item != null) {
            var config2 = {
              method: "post",
              url: "https://services.censuble.com/api/v1/response",
              headers: {
                Authorization: `Bearer ${uuid.access_token}`,
                "Content-Type": "application/json",
              },
              data: {
                config: {
                  device_uuid: this.state.config.uuid,
                  device_name: this.state.config.name,
                  device_location: this.state.config.location_name,
                  company_name: this.state.config.company_name,
                  company_uuid: this.state.config.company_uuid,
                },
                responses: JSON.parse(item),
              },
            };

            axios(config2)
              .then(async (response) => {
                console.log(response.data, "REsponse Api");
                try {
                  await AsyncStorage.removeItem("WithoutInternetResponse");
                  return true;
                } catch (exception) {
                  return false;
                }
              })

              .catch(function (error) {
                console.log(error);
              });
          }
        });

        var config = {
          method: "post",
          url: "https://services.censuble.com/api/v1/response",
          headers: {
            Authorization: `Bearer ${uuid.access_token}`,
            "Content-Type": "application/json",
          },
          data: data2,
        };

        axios(config)
          .then((response) => {
            console.log(response.data, "REsponse Api");
            AsyncStorage.setItem(
              "surveyid",
              JSON.stringify({
                surveyId: this.state.survey.uuid,
                company: this.state.config.company_uuid,
              })
            );
          })
          .then(() => {
            if (this.state.config.suggestion_enabled === "none") {
              this.props.navigation.navigate("Thankyou");
            } else {
              this.props.navigation.navigate("Feedback");
            }
          })
          .catch(function (error) {
            console.log(error);
            AsyncStorage.getItem("WithoutInternetResponse").then((item) => {
              if (item != null) {
                let array = JSON.parse(item);
                for (let item of responses) {
                  array.push(item);
                }
                AsyncStorage.setItem(
                  "WithoutInternetResponse",
                  JSON.stringify(array)
                ).then(() => {
                  this.props.navigation.navigate("Thankyou");
                });
              } else {
                AsyncStorage.setItem(
                  "WithoutInternetResponse",
                  JSON.stringify(responses)
                ).then(() => {
                  this.props.navigation.navigate("Thankyou");
                });
              }
            });
          });
      } else {
        AsyncStorage.getItem("WithoutInternetResponse").then((item) => {
          if (item != null) {
            let array = JSON.parse(item);
            for (let item of responses) {
              array.push(item);
            }
            AsyncStorage.setItem(
              "WithoutInternetResponse",
              JSON.stringify(array)
            ).then(() => {
              this.props.navigation.navigate("Thankyou");
            });
          } else {
            AsyncStorage.setItem(
              "WithoutInternetResponse",
              JSON.stringify(responses)
            ).then(() => {
              this.props.navigation.navigate("Thankyou");
            });
          }
        });

        console.log("Not Connected");
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem("WithoutInternetResponse").then((item) => {
      console.log(JSON.parse(item), "Cache");
    });
    // this.getNewDimensions();
    this.apiCall();
    // setTimeout(() => {
    //   this.apiCall();
    // }, 300000);

    const unsubscribe = NetInfo.addEventListener((state) => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  render() {
    const suggestion = (
      <KeyboardAvoidingView style={{ marginHorizontal: 20 }}>
        <Suggestion
          value={this.state.highValue ? this.state.highValue.answer : null}
          onChangeText={(text) =>
            this.setState({
              facesAnswer: {
                id: 25,
                answer: text,
              },
            })
          }
        />
      </KeyboardAvoidingView>
    );

    const { pageHeight, index, pageWidth, data } = this.state;

    return (
      <View
        onLayout={this.getNewDimensions}
        style={{
          backgroundColor: "#FFFFFF",
          // height: pageHeight,
          // width: pageWidth,
          flex: 1,
        }}
      >
        <Header
          barStyle="light-content" // or directly
          containerStyle={{
            backgroundColor: "white",
            borderBottomColor: "#244661",
            height: 100,
            borderBottomWidth: 0.5,
          }}
          placement="right"
          leftComponent={
            <Image
              source={require("../Assets/Images/newLogo.png")}
              resizeMode="contain"
              style={{ height: 65, width: 150 }}
            />
          }
          centerComponent={
            <TouchableOpacity onPress={this.apiCall}>
              {this.state.data.length || this.state.survey === null ? (
                <Icon name="refresh" size={40} color="#244661" />
              ) : null}
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Login", {
                  screen: "survey",
                })
              }
            >
              {this.state.data.length || this.state.survey === null ? (
                <Icon name="settings" size={40} color="#244661" />
              ) : null}
            </TouchableOpacity>
          }
        />

        {this.state.data.length ? (
          <UserInactivity
            isActive={this.state.active}
            timeForInactivity={this.state.index === 0 ? 300000 : 30000}
            onAction={(isActive) => {
              console.log(isActive, "gggggg");
              this.setState({ active: isActive });
              if (isActive === false) {
                this.apiCall();
              }
            }}
          >
            <View style={{ marginHorizontal: wp("3%") }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: hp("2.5%"),
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  {this.state.surveyNumber + 1} of {this.state.surveyLength}
                </Text>
              </View>
              <View
                style={{
                  // width: '90%',
                  alignSelf: "center",
                }}
              >
                <ProgressBar
                  progress={this.state.progress}
                  width={pageWidth - 100}
                  color="#8E8E8E"
                  borderWidth={1}
                  height={10}
                  borderColor="#707070"
                />
              </View>

              {this.state.data.map((item, index) => {
                if (index === this.state.index) {
                  return (
                    <View key={index} style={{}}>
                      <View style={styles.questionView}>
                        <Text numberOfLines={5} style={styles.questionText}>
                          {item.question_text}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: "50%",
                        }}
                      >
                        {item.answer_type === "fsfsfsf" ? (
                          <FacesAnswers
                            answerTypes={facesAnswerType}
                            value={
                              this.state.highValue
                                ? this.state.highValue.id
                                : null
                            }
                            onPress={(item) => {
                              this.setState({
                                facesAnswer: item,
                              });
                            }}
                          />
                        ) : (
                          [
                            item.answer_type === "selectall" ? (
                              <Answer
                                answerTypes={item.answers}
                                value={
                                  this.state.highValue
                                    ? this.state.highValue
                                    : null
                                }
                                onPress={(item) => {
                                  let foundR = this.state.multiple.some(
                                    (el) => el.answer_id === item.answer_id
                                  );
                                  if (!foundR) {
                                    this.state.multiple.push(item);
                                    this.setState({
                                      facesAnswer: this.state.multiple,
                                    });

                                    console.log(
                                      this.state.facesAnswer,
                                      "Answers"
                                    );
                                  }
                                }}
                              />
                            ) : (
                              [
                                item.answer_type === "hearts" ? (
                                  <HeartsAnswers
                                    answerTypes={HeartsAnswersTypes}
                                    value={
                                      this.state.highValue
                                        ? this.state.highValue.id
                                        : null
                                    }
                                    onPress={(item) => {
                                      this.setState({
                                        facesAnswer: item,
                                      });
                                    }}
                                  />
                                ) : (
                                  [
                                    item.answer_type === "stars" ? (
                                      <StarsAnswers
                                        answerTypes={StarsAnswersTypes}
                                        value={
                                          this.state.highValue
                                            ? this.state.highValue.id
                                            : null
                                        }
                                        onPress={(item) => {
                                          console.log(item, "Clicked");
                                          this.setState({
                                            facesAnswer: item,
                                          });
                                        }}
                                      />
                                    ) : (
                                      [
                                        item.answer_type === "yesno" ? (
                                          <YesNoAnswer
                                            value={
                                              this.state.highValue
                                                ? this.state.highValue.id
                                                : null
                                            }
                                            answerTypes={YesorNoAnswerTpes}
                                            onPress={(item) =>
                                              this.setState({
                                                facesAnswer: item,
                                              })
                                            }
                                          />
                                        ) : (
                                          [
                                            item.answer_type ===
                                            "multiplechoice" ? (
                                              <Choice
                                                answerTypes={item.answers}
                                                onPress={(item) => {
                                                  console.log(
                                                    item,
                                                    "Answers Single"
                                                  );

                                                  this.setState({
                                                    facesAnswer: item,
                                                  });
                                                }}
                                              />
                                            ) : (
                                              [
                                                item.answer_type ===
                                                "thumbs" ? (
                                                  <ThumbsAnswers
                                                    value={
                                                      this.state.highValue
                                                        ? this.state.highValue
                                                            .id
                                                        : null
                                                    }
                                                    answerTypes={
                                                      thumbsAnswerTpes
                                                    }
                                                    onPress={(item) => {
                                                      console.log(
                                                        "Thumbs",
                                                        item
                                                      );
                                                      this.setState({
                                                        facesAnswer: item,
                                                      });
                                                    }}
                                                  />
                                                ) : (
                                                  [
                                                    item.answer_type ===
                                                    "likert" ? (
                                                      <LikertsAnswers
                                                        value={
                                                          this.state.highValue
                                                            ? this.state
                                                                .highValue.id
                                                            : null
                                                        }
                                                        onPress={(item) =>
                                                          this.setState({
                                                            facesAnswer: item,
                                                          })
                                                        }
                                                        answerTypes={
                                                          LikertAnswerTypes
                                                        }
                                                      />
                                                    ) : (
                                                      <TouchableOpacity
                                                        onPress={() =>
                                                          this.setState({
                                                            visible: true,
                                                          })
                                                        }
                                                        style={styles.content}
                                                      >
                                                        <TextInput
                                                          value={
                                                            this.state.highValue
                                                              ? this.state
                                                                  .highValue
                                                                  .answer
                                                              : "Hello"
                                                          }
                                                          // editable={false}
                                                          // autoFocus={true}
                                                          multiline={true}
                                                          style={{
                                                            fontSize: 30,
                                                            fontFamily:
                                                              "Poppins-Regular",
                                                          }}
                                                        />

                                                        <Modal
                                                          visible={
                                                            this.state.visible
                                                          }
                                                        >
                                                          {/* <StatusBar translucent backgroundColor="red" /> */}

                                                          <View
                                                            style={[
                                                              styles.content,
                                                              {
                                                                height: "100%",
                                                              },
                                                            ]}
                                                          >
                                                            <View
                                                              style={{
                                                                flexDirection:
                                                                  "row",
                                                                marginVertical: 5,
                                                                justifyContent:
                                                                  "space-between",
                                                              }}
                                                            >
                                                              <IconCross
                                                                name="cross"
                                                                size={50}
                                                                onPress={() => {
                                                                  this.setState(
                                                                    {
                                                                      visible: true,
                                                                    }
                                                                  );
                                                                  Keyboard.dismiss();
                                                                }}
                                                              />
                                                              <TouchableOpacity
                                                                onPress={() => {
                                                                  this.setState(
                                                                    {
                                                                      visible: false,
                                                                    }
                                                                  );
                                                                  Keyboard.dismiss();
                                                                }}
                                                                style={{
                                                                  height: 50,
                                                                  width: 100,
                                                                  backgroundColor:
                                                                    "#114B78",
                                                                  justifyContent:
                                                                    "center",
                                                                  alignItems:
                                                                    "center",
                                                                }}
                                                              >
                                                                <Text
                                                                  style={{
                                                                    color:
                                                                      "#FFFFFF",
                                                                    fontSize: 16,
                                                                    fontFamily:
                                                                      "Poppins-Regular",
                                                                  }}
                                                                >
                                                                  Save
                                                                </Text>
                                                              </TouchableOpacity>
                                                            </View>

                                                            <TextInput
                                                              onBlur={() =>
                                                                this.setState({
                                                                  visible: false,
                                                                })
                                                              }
                                                              numberOfLines={10}
                                                              multiline={true}
                                                              style={{
                                                                fontSize: 30,
                                                                fontFamily:
                                                                  "Poppins-Regular",
                                                              }}
                                                              value={
                                                                this.state
                                                                  .highValue
                                                                  ? this.state
                                                                      .highValue
                                                                      .answer
                                                                  : null
                                                              }
                                                              onChangeText={(
                                                                text
                                                              ) =>
                                                                this.setState({
                                                                  facesAnswer: {
                                                                    id: 25,
                                                                    answer:
                                                                      text,
                                                                  },
                                                                  highValue: {
                                                                    id: 25,
                                                                    answer:
                                                                      text,
                                                                  },
                                                                })
                                                              }
                                                              returnKeyType="next"
                                                              placeholder="Write Something"
                                                              autoFocus={true}
                                                            />
                                                          </View>
                                                        </Modal>
                                                      </TouchableOpacity>
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        )}
                      </View>

                      <View
                        style={{
                          // justifyContent: 'center',
                          height: "20%",
                        }}
                      >
                        {index === 0 ? (
                          <View
                            style={{
                              alignItems: "center",
                            }}
                          >
                            <Button
                              disabled={
                                this.state.facesAnswer === null ? true : false
                              }
                              title="Next"
                              onPress={() => this.next(item, index)}
                              backgroundColor={
                                this.state.facesAnswer === null
                                  ? "grey"
                                  : "#114B78"
                              }
                            />
                          </View>
                        ) : index != 0 && index < this.state.data.length ? (
                          <View
                            style={{
                              justifyContent: "space-evenly",

                              flexDirection: "row",
                            }}
                          >
                            <Button
                              backgroundColor="#114B78"
                              title="Previous"
                              onPress={() => this.previous(item, index)}
                            />
                            <Button
                              disabled={
                                this.state.facesAnswer === null ? true : false
                              }
                              backgroundColor={
                                this.state.facesAnswer === null
                                  ? "grey"
                                  : "#114B78"
                              }
                              title="Next"
                              onPress={() => this.next(item, index)}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          </UserInactivity>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}
export default Survey;
const styles = StyleSheet.create({
  text: {
    color: "#5A5A5A",
    fontSize: 22,
    fontWeight: "bold",
  },
  single: {
    height: 70,
    borderWidth: 1,
    shadowRadius: 1,
    shadowColor: "#AFAFAF",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    width: wp("80%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#AFAFAF",
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
  },
  singleSelect: {
    height: 70,
    borderWidth: 1,
    shadowRadius: 1,
    shadowColor: "#AFAFAF",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    width: wp("80%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#114B78",
    borderColor: "#AFAFAF",
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
  },
  textcolor: {
    color: "black",
    fontSize: 22,

    fontFamily: "Poppin-Regular",
  },
  activeText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "400",
    fontFamily: "Poppin-Regular",
  },

  questionView: {
    marginVertical: 20,
    height: "20%",
    marginHorizontal: wp("3%"),
    alignSelf: "center",
  },
  questionText: {
    fontSize: aspectRatio > 1.6 ? 20 : 40,
    flex: 1,
    // flexWrap: 'wrap',
    // textAlign: 'center',
    fontFamily: "Poppins-Bold",
  },
  content: {
    // marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    // marginHorizontal: 15,
    height: "85%",
    width: "100%",
    elevation: 4,
    shadowOpacity: 2,
    shadowRadius: 15,

    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
});
