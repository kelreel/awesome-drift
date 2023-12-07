import { ActionList, Button, Popover } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

export const ThemeSelectButton = () => {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    return (
        <Popover
            active={popoverActive}
            activator={<Button onClick={togglePopoverActive} disclosure>
                Add to theme
            </Button>}
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
        >
            <ActionList
                actionRole="menuitem"
                items={[{ content: 'Import' }, { content: 'Export' }]}
            />
        </Popover>
    );
} 