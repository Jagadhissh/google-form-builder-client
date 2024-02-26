export interface QuestionShape {
  question: string;
  type: "text" | "multipleChoice" | "dropdown";
  options: string[];
  required: boolean;
}

export interface FormShape {
  title: string;
  description: string;
  questions: QuestionShape[];
}
