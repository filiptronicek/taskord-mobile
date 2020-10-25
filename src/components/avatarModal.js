import { Avatar, Card, Modal } from "@ui-kitten/components";
import React, { useState } from "react";

import { requestData } from "../app/api-req";
import { styles } from "../app/includes/styles.js";

export const ProfileModal = () => {
    const [avatarURL, setAvatarURL] = useState("assets/image-person.png");
    const [visible, setVisible] = useState(false);

    const getAvatar = async() => {
        const reqRes = await requestData("avatar");
        setAvatarURL(reqRes.data.me.avatar);
      };
      getAvatar();

    return (
        <Modal visible={true}
            backdropStyle={
                styles.backdrop
            }
            style={
                {width: "95%"}
            }
            onBackdropPress={
                () => setVisible(false)
        }>
            <Card disabled={true}>
                <Avatar source={{uri: avatarURL}} style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}/>
            </Card>
        </Modal>
    )
};
