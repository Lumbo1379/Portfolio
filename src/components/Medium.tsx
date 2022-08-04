import {
    ReactElement,
    useState,
    useEffect,
    useRef,
} from 'react';

import Collage from './Collage';
import { ITagContent } from './Tag';

import httpService from '../services/httpService';
import logger from '../services/logService';

interface IMediumProfile {
    url: string,
    profilePicture: string
}

const parseRSSToJSON = async (): Promise<any> => {
    const feed = await httpService.get('/medium');
    return feed.data;
};

export const getTags = async (tags: string[][]): Promise<ITagContent[][]> => {
    const tagDescriptions = await httpService.post('/tags', { tags });
    return tagDescriptions.data;
};

const getImageFromContent = (content: string): string => {
    let imageUrl = '';
    const contentLength = content.length;
    let readImageUrl = false;

    for (let c = 0; c < contentLength; c++) {
        if (readImageUrl) {
            if (content[c] === '"') break;
            imageUrl += content[c];
        } else if (content[c] === 's') {
            if (!readImageUrl && content.substring(c, c + 5) === 'src="') {
                readImageUrl = true;
                c += 4;
            }
        }
    }

    return imageUrl;
};

const getMostRecentArticles = (data: any): any => {
    const recentArticles = data.items.slice(Math.max(data.items.length - 3, 0));
    const numberOfRecentArticles = recentArticles.length;

    const articles = [];

    for (let a = 0; a < numberOfRecentArticles; a++) {
        const article = recentArticles[a];
        const articleImage = getImageFromContent(article['content:encoded']);

        articles[a] = {
            link: article.link,
            title: article.title,
            image: articleImage,
            tags: article.categories,
        };
    }

    return articles;
};

const FIRST_ARTICLE_INDEX = 0;
const SECOND_ARTICLE_INDEX = 1;
const THIRD_ARTICLE_INDEX = 2;

const Medium = (): ReactElement | null => {
    const [articles, setArticles] = useState<any>([]);

    const mediumProfile = useRef<IMediumProfile>({
        url: '',
        profilePicture: '',
    });
    const mediumTagDescriptionsRef = useRef<ITagContent[][]>([]);

    useEffect(() => {
        const loadMediumData = async (): Promise<void> => {
            const mediumData = await parseRSSToJSON();

            const topArticles = getMostRecentArticles(mediumData);
            mediumProfile.current = {
                url: mediumData.link,
                profilePicture: mediumData.image.url,
            };

            const tags = topArticles.map((article: { tags: string[] }) => article.tags);
            mediumTagDescriptionsRef.current = await getTags(tags);

            setArticles(topArticles);
        };

        loadMediumData();
    }, []);

    if (articles.length === 0) return null;

    if (articles.length !== 3) {
        logger.error('Exactly three articles are required');
    }

    if (!mediumProfile.current?.profilePicture || !mediumProfile.current?.url) {
        logger.error('Medium profile was not properly fetched');
        logger.error(JSON.stringify(mediumProfile.current), false);
    }

    return (
        <Collage
            images={[
                {
                    src: mediumProfile.current.profilePicture,
                    alt: 'Medium profile picture',
                    config: {
                        tags: [[{
                            description: 'My Medium Page',
                            colour: '',
                        }]],
                        link: mediumProfile.current.url,
                    },
                },
                {
                    src: articles[FIRST_ARTICLE_INDEX].image,
                    alt: articles[FIRST_ARTICLE_INDEX].title,
                    config: {
                        tags: [[{
                            description: articles[FIRST_ARTICLE_INDEX].title,
                            colour: '',
                        }], mediumTagDescriptionsRef.current[FIRST_ARTICLE_INDEX]],
                        link: articles[FIRST_ARTICLE_INDEX].link,
                    },
                },
                {
                    src: articles[SECOND_ARTICLE_INDEX].image,
                    alt: articles[SECOND_ARTICLE_INDEX].title,
                    config: {
                        tags: [[{
                            description: articles[SECOND_ARTICLE_INDEX].title,
                            colour: '',
                        }], mediumTagDescriptionsRef.current[SECOND_ARTICLE_INDEX]],
                        link: articles[SECOND_ARTICLE_INDEX].link,
                    },
                },
                {
                    src: articles[THIRD_ARTICLE_INDEX].image,
                    alt: articles[THIRD_ARTICLE_INDEX].title,
                    config: {
                        tags: [[{
                            description: articles[THIRD_ARTICLE_INDEX].title,
                            colour: '',
                        }], mediumTagDescriptionsRef.current[THIRD_ARTICLE_INDEX]],
                        link: articles[THIRD_ARTICLE_INDEX].link,
                    },
                },
            ]}
            layout={[
                [0, 1],
                [2, 3],
            ]}
        />
    );
};

export default Medium;
