interface IPostedFormDataShape {
  _id: string;
  title: string;
  description: string;
  questions: {
    question: string;
    type: string;
    options?: string[];
  }[];
}
export default IPostedFormDataShape;
