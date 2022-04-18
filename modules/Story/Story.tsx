import type { ExtendedStory } from '@prezly/sdk';
import { StoryFormatVersion } from '@prezly/sdk';
import { StorySeo } from '@prezly/theme-kit-nextjs';

import { SlateRenderer } from '@/components';
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
                {format_version === StoryFormatVersion.HTML && (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                )}
                {format_version === StoryFormatVersion.SLATEJS && (
                    <SlateRenderer nodes={JSON.parse(content)} />
                )}
            </article>
        </Layout>
    );
}
