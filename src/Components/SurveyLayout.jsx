import React from 'react';
import CreateSurvey from './Create Survey/CreateSurvey';
import Survey from './Survey/Survey';
import Working from './Working/Working';

export default function SurveyLayout() {
  return (
    <>
      <Survey/>
      <Working/>
      <CreateSurvey/> 
    </>
  )
}
