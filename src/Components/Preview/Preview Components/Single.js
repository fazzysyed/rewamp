import React, { useState } from "react";

class Single extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: null,
    };
  }

  componentDidMount = () => {
    if (this.props.value != null) {
      this.setState({ selectedItem: this.props.value });
    }
  };

  handleSelection = (item) => {
    var selectedId = this.state.selectedItem;

    if (selectedId === item.id) this.setState({ selectedItem: null });
    else this.setState({ selectedItem: item.id });
    this.props.onPress(item);
  };

  render() {
    return (
      <div
        style={{
          justifyContent: "center",
          // float:'left',
          display: "flex",
          flexDirection: "column",
          width: "100%",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {this.props.answerTypes.map((item) => {
          console.log(item, "KKKK");
          return (
            <div
              className={
                this.props.minimize
                  ? "questions-tabPreview"
                  : "questions-tabPreview"
              }
              key={item.answer_id}
              onClick={() => this.handleSelection(item)}
              style={{
                // height: 40,
                borderWidth: 1,
                shadowRadius: 1,
                shadowColor: "#AFAFAF",
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 1 },
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                backgroundColor:
                  this.state.selectedItem === item.id ? "#114B78" : "#FFFFFF",
                borderColor: "#AFAFAF",
                borderRadius: 4,
                padding: "7px 0px",

                display: "flex",

                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  marginBottom: 0,

                  color:
                    this.state.selectedItem === item.id ? "#FFFFFF" : "#122838",
                }}
              >
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Single;
