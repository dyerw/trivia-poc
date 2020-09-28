import React from "react";
import { Button, Col, Row } from "antd";
import { User, Question } from "../reducers";

type Props = {
  users: User[];
  question: Question | null;
};

const Game: React.FunctionComponent<Props> = (props) =>
  props.question ? (
    <>
      <Row>
        <Col span={24}>{props.question.text}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <Button type="primary">{props.question.a}</Button>
        </Col>
        <Col span={12}>
          <Button type="primary">{props.question.b}</Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Button type="primary">{props.question.c}</Button>
        </Col>
        <Col span={12}>
          <Button type="primary">{props.question.d}</Button>
        </Col>
      </Row>
    </>
  ) : (
    <div>No question for some reason</div>
  );

export default Game;
