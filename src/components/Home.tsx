import { ReactElement, useEffect, useState } from 'react';
import httpService from '../services/httpService';
import Headline from './Headline';
import Collage from './Collage';
import Medium from './Medium';
import { IImage } from './Image';

const getProjects = async (): Promise<IImage[]> => {
    const projects = await httpService.get('/projects');
    return projects.data;
};

const Home = (): ReactElement | null => {
    const [projects, setProjects] = useState<IImage[]>([]);

    useEffect(() => {
        const loadProjects = async (): Promise<void> => {
            const projectData = await getProjects();

            for (const project of projectData) {
                // eslint-disable-next-line import/no-dynamic-require, global-require
                project.src = require(`../media/${project.src}`);
            }

            setProjects(projectData);
        };

        loadProjects();
    }, []);

    if (!projects || projects.length === 0) return null;

    return (
        <div>
            <Headline
                content="Software and game developer"
                keywords={{ Software: '#F6BD60', developer: '#F5CAC3' }}
            />
            <Collage
                images={projects}
                layout={[
                    [0, 1],
                    [0, 2],
                ]}
            />
            <Medium />
        </div>
    );
};

export default Home;

/*
TODO:
- envs for prod and dev for logging
- tag colours
- tag translations
- allowed / disallowed tags
- click on article to load in new tab
- link icons, e.g. git, medium, youtube
*/
