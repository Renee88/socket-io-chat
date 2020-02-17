import { Modal } from 'antd';
import React from 'react';

export default function PrivateInvitation({ open, handleOk, handleCancel, currUser: { currId, currName }, friend: { id, name } }) {
    console.log(id, name)
    return (
        <div>
            <Modal
                title="Basic Modal"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{`Hey, ${currName}!`}</p>
                <p>{`It's ${name}`}</p>
                <p>{`I would like to know you better.`}</p>
                <p>{`Would you like to join me for a private conversation?`}</p>
            </Modal>
        </div>
    );

}