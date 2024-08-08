import { css } from '@emotion/css';

const boxWithSvg = (uiTheme: string): any => {
    const colorObject = {
        iconColor: uiTheme === 'light' ? '#000000' : 'var(--jusda-primary-color)',
    };
    return css(`
        .icon {
            >svg{
                path{
                    fill:${colorObject.iconColor};
                }
            }
               
        }
    `);
};
export { boxWithSvg };
