import type { ExtendedStory } from '@prezly/sdk';
import { FormatVersion } from '@prezly/theme-kit-core';
import { StorySeo } from '@prezly/theme-kit-nextjs';

import { ContentRenderer } from '@/components';
import { Layout } from '@/modules/Layout';

interface Props {
    story: ExtendedStory;
}

export function Story({ story }: Props) {
    const { title, subtitle, content, format_version } = story;

    return (
        <Layout>
            <StorySeo story={story} />
            <article>
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                {Number(format_version) === FormatVersion.HTML && (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                )}
                {Number(format_version) >= FormatVersion.SLATEJS && (
                    <ContentRenderer nodes={JSON.parse(content)} />
                )}
            </article>
        </Layout>
    );
}
