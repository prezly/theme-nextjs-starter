import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import { IconDownload } from 'icons';

function DownloadLink() {
    return (
        <div>
            <FormattedMessage {...translations.actions.download} />
            <IconDownload />
        </div>
    );
}

export default DownloadLink;
