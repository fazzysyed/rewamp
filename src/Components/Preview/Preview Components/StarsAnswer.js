import React, { useState, useEffect } from "react";

import { StarsAnswersTypes } from "../Preview Helper/AnswersType";
// const {height, width} = Dimensions.get('window');

const StarsAnswers = ({ onPress, value, minimize }) => {
  const [defaultRating, setDefaultRating] = useState(value);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  return (
    <div
      style={{
        display: "-webkit-flex",
        flexDirection: "row",
        justifyContent: "space-between",

        display: "flex",
      }}
    >
      {StarsAnswersTypes.map((item, index) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={item.id}
            onClick={() => {
              setDefaultRating(item.id);
              onPress(item);
            }}
          >
            <div>
              <img
                className={
                  minimize ? "stars-image-tabPreview" : "stars-imagePreview"
                }
                resizeMode="contain"
                src={item.id <= defaultRating ? item.selected : item.un}
              />

              {index === 0 ? (
                <p
                  className={minimize ? "worst-tabPreview" : "worstPreview"}
                  style={{
                    marginTop: 10,
                    color: "#122838",

                    marginLeft: minimize ? 0 : 10,

                    fontSize: 14,
                  }}
                >
                  Worst Rating
                </p>
              ) : null}
              {index === StarsAnswersTypes.length - 1 ? (
                <p
                  className={
                    minimize ? "best-stars-tabPreview" : "best-starsPreview"
                  }
                  style={{
                    color: "#122838",

                    marginTop: 10,
                    fontSize: 14,

                    marginRight: minimize ? 0 : 10,
                    textAlign: "center",
                  }}
                >
                  Best Rating
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
      {/* <Text style={{fontSize: 50, fontWeight: 'bold'}}>{1 + 1}</Text> */}
    </div>
  );
};

export default StarsAnswers;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     justifyContent: 'center',
//     textAlign: 'center',
//   },
//   titleText: {
//     padding: 8,
//     fontSize: 16,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   textStyle: {
//     textAlign: 'center',
//     fontSize: 23,
//     color: '#000',
//     marginTop: 15,
//   },
//   textStyleSmall: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#000',
//     marginTop: 15,
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 30,
//     padding: 15,
//     backgroundColor: '#8ad24e',
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//   },

// });
