import { STORY_FILE, useAnalytics } from '@prezly/analytics-nextjs';
import type { AttachmentNode } from '@prezly/slate-types';
import { UploadcareFile } from '@prezly/slate-types';

import DownloadLink from './DownloadLink';
import FileTypeIcon from './FileTypeIcon';
import { formatBytes } from './utils';

interface Props {
    node: AttachmentNode;
}

function Attachment({ node }: Props) {
    const { track } = useAnalytics();
    const { file, description } = node;
    const { downloadUrl } = UploadcareFile.createFromPrezlyStoragePayload(file);
    const displayedName = description || file.filename;
    const fileExtension = file.filename.split('.').pop();
    const fileType = fileExtension?.toUpperCase();

    function handleClick() {
        track(STORY_FILE.DOWNLOAD, { id: file.uuid });
    }

    return (
        <a id={`attachment-${file.uuid}`} href={downloadUrl} onClick={handleClick}>
            <div>
                <FileTypeIcon extension={fileExtension} />
            </div>
            <div>
                <h4>{displayedName}</h4>
                <h5>
                    {fileType}
                    {fileType && ' - '}
                    {formatBytes(file.size)}
                </h5>
            </div>
            <DownloadLink />
        </a>
    );
}

export default Attachment;
