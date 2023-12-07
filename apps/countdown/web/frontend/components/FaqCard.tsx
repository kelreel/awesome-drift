import React from 'react';
import { CalloutCard } from '@shopify/polaris';

export const FaqCard = () => {
    return <CalloutCard
        title="Need any help?"
        illustration="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        primaryAction={{ content: 'Documentation', url: "https://gsc-countdown.notion.site/gsc-countdown/Getting-Started-fa5286f3909d44a18fdbfb525cdfc508" }}
        secondaryAction={{ content: 'Support', url: 'https://getsitecontrol.com/#showChat' }}
    >
        <p>Learn about types of blocks, timer modes, appearance and more.</p>
    </CalloutCard>
}