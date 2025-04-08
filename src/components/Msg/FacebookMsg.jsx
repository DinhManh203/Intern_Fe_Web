import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="688145323653542" chatSupport>
            <CustomChat pageId="609437422252742" minimized={true} />
        </FacebookProvider>
    )
}

export default FacebookMsg