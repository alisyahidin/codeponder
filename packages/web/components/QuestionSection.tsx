import * as React from "react";
import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsVariables,
} from "./apollo-components";
import { QuestionForm, QuestionFormProps } from "./QuestionForm";
import { Question } from "./Question";

interface Props extends QuestionFormProps {
  variables: FindCodeReviewQuestionsVariables;
  linesSelection: number[];
}

export const QuestionSection = ({
  variables,
  code,
  postId,
  path,
  programmingLanguage,
  linesSelection,
}: Props) => {
  return (
    <FindCodeReviewQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading) {
          return null;
        }

        return (
          <>
            <QuestionForm
              code={code || ""}
              postId={postId}
              path={path}
              programmingLanguage={programmingLanguage}
              linesSelection={linesSelection}
            />
            <div>
              {data.findCodeReviewQuestions.map(crq => (
                <Question key={crq.id} q={crq} />
              ))}
            </div>
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
