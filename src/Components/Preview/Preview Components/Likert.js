import React from "react";

class Likert extends React.Component {
  render() {
    return (
      <div style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="ring-dataPreview" style={{ float: "left" }}>
            <p
              className={
                this.props.minimize
                  ? "ring-text-tabPreview"
                  : "ring-textPreview"
              }
            >
              {this.props.text}
            </p>
            <div onClick={this.props.onPress}>
              <img
                className={
                  this.props.minimize
                    ? "ring-image-tabPreview"
                    : "ring-imagePreview"
                }
                src={this.props.image}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Likert;
