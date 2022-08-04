import { ReactElement, useEffect, useState } from 'react';
import Headline from './Headline';
import Collage from './Collage';
import Medium, { getTags } from './Medium';
import { ITagContent } from './Tag';

import arXRay from '../media/ar-x-ray.gif';
import tanks from '../media/tanks.gif';
import soulSurvivor from '../media/soul-survivor.gif';

const WORK_TAGS = [
    ['C#', 'Unity'],
    ['C#', 'Unity'],
    ['C++', 'SDL'],
];

const Home = (): ReactElement | null => {
    const [workTagData, setWorkTagData] = useState<ITagContent[][]>([]);

    useEffect(() => {
        const loadWorkTagData = async (): Promise<void> => {
            setWorkTagData(await getTags(WORK_TAGS));
        };

        loadWorkTagData();
    }, []);

    if (WORK_TAGS.length !== workTagData.length) return null;

    return (
        <div>
            <Headline
                content="Software and game developer"
                keywords={{ Software: '#F6BD60', developer: '#F5CAC3' }}
            />
            <Collage
                images={[
                    {
                        src: arXRay,
                        alt: 'A user selecting a heart organ using augmented reality.',
                        config: {
                            tags: [[
                                {
                                    description: 'AR Organ Teaching App',
                                    colour: '',
                                },
                            ], workTagData[0],
                            ],
                            content: `
                            An educational augmented reality constructed using the Unity game engine.
                             Mobile phone users have x-ray vision, and are taked to find specific body
                             organs. Once found users can interact with the organ, to get a closer
                             360° look.
                            `,
                        },
                    },
                    {
                        src: soulSurvivor,
                        alt: 'A knight slashing a slime monster.',
                        config: {
                            tags: [[
                                {
                                    description: '2D Slasher Prototype',
                                    colour: '',
                                },
                            ], workTagData[1],
                            ],
                            content: `
                            This was made during a 24hr game jam. I like to use game james as an
                             opportunity to learn new skills or improve a technique. For this game
                             jam I focused on improved my understanding of "juicy" gameplay and effects.
                            `,
                        },
                    },
                    {
                        src: tanks,
                        alt: '1 A.I. and 1 user tank trying to shoot each other.',
                        config: {
                            tags: [[
                                {
                                    description: 'A.I. vs Human Tank Shooter',
                                    colour: '',
                                },
                            ], workTagData[2],
                            ],
                            content: `
                            A small game project created using SDL. The simple A.I. tank (seen in brown)
                             uses A* path finding to traverse the map. It uses raycasts before shooting at
                             the player to ensure the projectile will not hit a wall before reaching the
                             player.
                            `,
                        },
                    },
                ]}
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
