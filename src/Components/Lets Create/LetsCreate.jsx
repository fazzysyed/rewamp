import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  changeSelectedQuestions,
  changeSurveyUuid,
  createSurvey,
  getAllAnswers,
  getAllQuestions,
  selectedAccount,
  updateSurvey,
} from "../../store/actions/actions";
import AddTags from "../Add Tags/AddTags";
import axios from "axios";
import "./LetsCreate.css";
import { USER_UUID } from "../../constants/User_uuid";

export default function LetsCreate() {
  const location = useLocation();
  const history = useHistory();
  const categories = useSelector((state) => state.Reducer.categories);
  const accounts = useSelector((state) => state.Reducer.accounts);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [nameError, setNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [catError, setCatError] = useState("");
  const [selected, setSelected] = useState([]);
  const [copy, setCopy] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);

  const handleSelection = (item) => {
    var selectedIds = [...selected]; // clone state
    if (selectedIds.includes(item.id)) {
      selectedIds = selectedIds.filter((_id) => _id !== item.id);
    } else selectedIds.push(item.id);
    setSelected(selectedIds);
    console.log(selectedIds);
  };

  useEffect(() => {
    if (location.state) {
      setName(location.state.survey.name);
      setDescription(location.state.survey.description);
      if (location.state.survey.account_uuid) {
        setAccount(location.state.survey.account_uuid);
      }
      setSelected(location.state.survey.categories);
      console.log(location.state, "AJAJFAJFJ");
      setCopy(
        location.state.survey.copy != undefined ||
          location.state.survey.copy != null
          ? location.state.survey.copy
          : false
      );
      dispatch(
        changeSelectedQuestions(
          location.state.survey.questions != undefined ||
            location.state.survey.questions != null
            ? location.state.survey.questions
            : []
        )
      );
      dispatch(changeSurveyUuid(location.state.survey.uuid));

      // item.account_uuid === null
    } else {
      setCopy(true);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(accounts)) {
      if (accounts.length === 1) {
        setAccount(accounts[0].account_uuid);
        dispatch(selectedAccount(accounts[0].account_uuid));

        setShowAccounts(false);
        dispatch(getAllQuestions(accounts[0].account_uuid));
        dispatch(getAllAnswers(accounts[0].account_uuid));
      }
    }
    // if (account) {
    // }
  }, [accounts]);

  const createSurveyHandler = () => {
    if (validate()) {
      if (copy) {
        dispatch(
          createSurvey({
            account_uuid: account,
            name: name,
            description: description,
            suggestion_enabled: "0",
            suggestion_type: "text",
            featured: "0",
            points: "0",
            questions:
              location.state && location.state.survey.questions
                ? location.state.survey.questions
                : [],
            status: "pending",
            created_by: USER_UUID,
          })
        ).then((response) => {
          console.log(response, "JJJJ");
          let newArray = [];
          selected.map((item) => {
            newArray.push({
              id: item,
            });
          });

          var data = JSON.stringify({
            categories: newArray,
          });
          const Bearer = `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzAwMDNjNS1iOTQ2LTQxYmMtODc5OS05MTMyOGI1ODdkMTciLCJqdGkiOiI0MDBmYjk5OTRiYmQyYjgxNDZhMGY1ZjI3MjAxOTM0MDk3OGRmMDA3ZTA4ZDIzM2QyNzk5ODRmMDIwOTM3YWFjZTIwYmYyM2M3NGM2NWI0MyIsImlhdCI6MTY2MjU4MDQyMi43NTA0ODA4OTAyNzQwNDc4NTE1NjI1LCJuYmYiOjE2NjI1ODA0MjIuNzUwNDgyMDgyMzY2OTQzMzU5Mzc1LCJleHAiOjE2OTQxMTY0MjIuNzM1MjE0OTQ4NjU0MTc0ODA0Njg3NSwic3ViIjoiNSIsInNjb3BlcyI6W119.ePdUlDEMRamTvXuCBhiufVv8NeVUVMUoxIUjiG-z6472P4pjTnUsoTRsQIqRzTjTBgjz2mjTh01If7f_mYizKyjXdLfYtsgqUT2ZVq8_4v012A7LN68p1BJnOyG4C0SKiUzpRtpVxaOPnqOmWdtC9gEQIAvAxUq-IKZWCMx5SBmW5pNng3EHBR0vgeWno2x_1W2H3za0U31eUAVNnMcq7CbsUQIUVzyep98qepJcfcBwh3Jl364guqKJLtJ8317AcMxflsUBsVZb-qHJsLAqrM6lvOIXy86k1nzVN_6d8IPOGXlNJ73WsoM8N2zlDAult3QFh_GU-yF985u4YwLFt9qp_Ij3EC5uGLFcPiWNsXOWUAnmWWctUTUZ1NpZF_GwyBgFlack1ipsmCTSIkC6i9IKQJ7p3Q048EjiXy_F_f5waaldVJLOp5hrv-oSv2rNbGeIabtFRgscgErmg4o_KttwKYuXrd6DH0rTZ1_fIlh6G2sge6GNlGk_tql_065-zwU8GMylGcpfIM0TUGYk9IxBCdS9XkSkC5ly1A-p8ClJKXtTzeIT4GtSYwAJBiDBkZsjaA9G7wLvhBMqQ1bozItqqtr5z37XuBbslUaNtZvzaIDodQInfFJpkHNeEdLvcz7C6CRdTuOC2qDSZtII59ML-hveiPBssH0An8BrHcs"}`;

          var config = {
            method: "post",
            url: `https://services.censubledev.com/api/v1/survey-categories/${response.survey_uuid}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: Bearer,
            },
            data: data,
          };

          axios(config)
            .then(function (response) {
              console.log(response.data, "KAFJHAHFAFH");
              history.push("/AddQuestions");
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      } else {
        dispatch(updateSurvey("pending"));
      }
    }
  };

  const validate = () => {
    let nameErrorv = "";
    let desErrorv = "";
    let accountErrorv = "";
    let catErrorv = "";
    if (!name) {
      nameErrorv = "Name field is required.";
    }
    if (!description) {
      desErrorv = "Description field is required.";
    }
    if (!account) {
      accountErrorv = "Account field is required.";
    }
    if (selected.length < 1) {
      catErrorv = "Category field is required.";
    }
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (!email || reg.test(email) === false) {
    //   emailerror = "Email Field is Invalid ";
    // }

    if (nameErrorv || desErrorv || desErrorv || catErrorv) {
      setNameError(nameErrorv);
      setDesError(desErrorv);
      setAccountError(accountErrorv);
      setCatError(catErrorv);
      return false;
    }
    setNameError("");
    setDesError("");
    setAccountError("");
    setCatError("");

    return true;
  };

  return (
    <div className="letscreate-container">
      <div className="create-fields-section">
        <div className="heading-container">
          <h1>Let's Create Your Survey!</h1>
        </div>

        <div className="survey-name-field">
          <p>Survey Name</p>
          <input
            type="text"
            placeholder="Survey Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            className="text-danger"
            style={{
              fontSize: 14,
              color: "red",
              margin: 5,
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: 0,
            }}
            htmlFor="name"
          >
            {nameError}
          </label>
        </div>

        <div className="survey-name-field">
          <p>Description</p>
          <input
            type="text"
            placeholder="Survey description....."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label
            className="text-danger"
            style={{
              fontSize: 14,
              color: "red",
              margin: 5,
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: 0,
            }}
            htmlFor="name"
          >
            {desError}
          </label>
        </div>

        {showAccounts && (
          <div className="survey-name-field">
            <p>Account</p>
            <select
              value={account}
              className="survey-account-select"
              defaultValue={account}
              onChange={(e) => {
                setAccount(e.target.value);
                dispatch(selectedAccount(e.target.value));
                dispatch(getAllQuestions(accounts[0].account_uuid));
                dispatch(getAllAnswers(accounts[0].account_uuid));
              }}
            >
              <option disabled value={""}>
                {"Select"}
              </option>
              {accounts.map((item) => (
                <option value={item.account_uuid}>{item.account_name}</option>
              ))}
            </select>

            <label
              className="text-danger"
              style={{
                fontSize: 14,
                color: "red",
                margin: 5,
                display: "flex",
                alignSelf: "flex-start",
                marginBottom: 0,
              }}
              htmlFor="name"
            >
              {accountError}
            </label>
          </div>
        )}

        {/* <div className='survey-name-field'>
                <p>Tags</p>
                <div className='selected-tag-create'>
                    <p className='tag-text-create'>Lorem Ipsum</p>
                    <p className='tag-text-create'>Lorem Ipsum</p>
                    <p className='tag-text-create'>Lorem Ipsum</p>
                    <p className='tag-text-create'>Lorem Ipsum</p>
                    <p className='add-tag-create' onClick={() => setVisible(!visible)}>+ Add Tag{visible}</p>
                </div>
                {visible &&  <AddTags/>}
            </div> */}

        <div className="survey-name-field">
          <p>Categories</p>
          <div className="selected-tag-create">
            {categories.map((item) => (
              <p
                onClick={() => {
                  handleSelection(item);
                }}
                style={{
                  background: selected.includes(item.id)
                    ? "#3d6ab8"
                    : "#ffffff",
                  color: selected.includes(item.id) ? "#ffffff" : "#3d6ab8",
                }}
                className="tag-text-create"
              >
                {item.name}
              </p>
            ))}

            <p className="add-tag-create" onClick={() => setShow(!show)}>
              + Add Category
            </p>
          </div>
          <label
            className="text-danger"
            style={{
              fontSize: 14,
              color: "red",
              margin: 5,
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: 0,
            }}
            htmlFor="name"
          >
            {catError}
          </label>
          {show && (
            <div className="create-category">
              <input
                className="create-question-input"
                type="text"
                placeholder="e-g Lorem Ipsum"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <div>
                <button className="create-category-btn">Add</button>
              </div>
            </div>
          )}
        </div>

        <div className="create-next-btn">
          <button onClick={createSurveyHandler} className="question-next-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
