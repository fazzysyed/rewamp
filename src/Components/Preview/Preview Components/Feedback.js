import React, { useState } from "react";
import Button from "../Preview Components/Button";

function Feedback({ minimize, feedback, handler, feed, sendFeedback }) {
  return (
    <>
      <div>
        <div className="survey_thanksPreview">
          <div className="survey_question_textPreview thanksPreview">
            Thank You. Leave Feedback!
          </div>
        </div>
        <div className="survey_textareaPreview">
          <textarea
            multiline={true}
            value={feedback}
            onChange={(value) => handler(value)}
            placeholder="Your Feedback Here..."
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className={"next-btn-tab-feedbackPreview"}
            // disabled={feedback.length === 0}
            title="Submit"
            onClick={sendFeedback}
          />
        </div>
      </div>
    </>
  );
}

export default Feedback;
