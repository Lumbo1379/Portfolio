import {
    ReactElement,
    useState,
    useEffect,
} from 'react';

import Collage from './Collage';

import httpService from '../services/httpService';
import logger from '../services/logService';

const getMediumData = async (): Promise<any> => {
    const feed = await httpService.get('/medium');
    return feed.data;
};

const Medium = (): ReactElement | null => {
    const [mediumData, setMediumData] = useState<any>([]);

    useEffect(() => {
        const loadMediumData = async (): Promise<void> => {
            setMediumData(await getMediumData());
        };

        loadMediumData();
    }, []);

    if (!mediumData || mediumData.length === 0) return null;

    if (mediumData.length !== 4) {
        logger.error('Exactly three articles and one profile picture are required');
    }

    return (
        <Collage
            images={mediumData}
            layout={[
                [0, 1],
                [2, 3],
            ]}
        />
    );
};

export default Medium;
