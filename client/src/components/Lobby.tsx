import React, { useRef } from 'react';
import { User } from "../reducers";

import { Layout, Input, Button } from 'antd';
const { Header, Content, Sider } = Layout;

export type Props = {
    users: readonly User[];
    onRegister: (name: string | undefined) => void;
}

const Lobby: React.FunctionComponent<Props> = ({ users, onRegister }) => {
    const inputEl = useRef<Input>(null);
    return (
        <Layout>
            <Header>Trivia!</Header>
            <Content>
                <Input ref={inputEl} />
                <Button type="primary" onClick={() => inputEl && onRegister(inputEl.current?.input.value)}>Register</Button>
                {users.map(u => u.name)}
            </Content>
        </Layout>
    )
}

export default Lobby;