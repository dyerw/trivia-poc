type Question = {
  text: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: "a" | "b" | "c" | "d";
};

export const questions: Question[] = [
  {
    text: "The answer to this one is A",
    a: "Yup",
    b: "Nope",
    c: "Nope",
    d: "Nope",
    answer: "a",
  },
  {
    text: "The answer to this one is D",
    a: "Nope",
    b: "Nope",
    c: "Nope",
    d: "Yup",
    answer: "d",
  },
  {
    text: "The answer to this one is B",
    a: "Nope",
    b: "Yup",
    c: "Nope",
    d: "Nope",
    answer: "b",
  },
];

export const getQuestion = (): Question =>
  questions[Math.floor(Math.random() * questions.length)];
