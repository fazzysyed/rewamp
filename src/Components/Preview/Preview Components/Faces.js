import React from "react";
class Faces extends React.Component {
  render() {
    return (
      <img
        className={
          this.props.minimize
            ? "images-survey-tabPreview big-responsive-tabPreview"
            : "images-surveyPreview big-responsivePreview"
        }
        onClick={this.props.onPress}
        resizeMode="contain"
        src={this.props.image}
        style={{
          height: "20%", // 70% of height device screen
          width: "20%",
        }}
      />
    );
  }
}

export default Faces;
