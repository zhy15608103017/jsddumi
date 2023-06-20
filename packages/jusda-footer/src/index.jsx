import * as React from 'react';
import * as PropTypes from 'prop-types'
import './index.css';

const string = '川公网安备 51019002002869号';

const API = 'https://www.jus-link.com/registration/';

const CLIENTOVERSEA = 'clientoversea'; //国外用户
const CLIENTDOMESTIC = 'clientdomestic'; //国内用户

function getEnvType (envType = '',cfgType = '') {
  if(envType.toLocaleLowerCase() === 'prod' || cfgType.toLocaleLowerCase() === 'prod') return '';
  return envType.toLocaleLowerCase() || cfgType.toLocaleLowerCase() || 'dev';
}

function getIntranetApiUrl(){
  // @ts-ignore
  const { cfgType, envType, root_domain = '.foxconn.com' } = window.jusdaBaseConfig || {};
  const urlPrefix = getEnvType(envType,cfgType);
  return `https://mp${urlPrefix}${root_domain}/registration/`;
}

function JusdaFooter(props = {}) {
  let { record, className = '', style = {}, ...attrs } = props;
  const [registrationStatus, setRegistrationStatus] = React.useState(false);

  React.useEffect(() => {
    const checkRegistration = () => {
      const { isIntranet } = window.jusdaBaseConfig;
      const isIntranet_API = getIntranetApiUrl();
      const apiUrl = isIntranet ? isIntranet_API : API;
      fetch(apiUrl).then((res) => {
        return res.json();
      }).then((res) => {
        if (res && res.registration) {
          setRegistrationStatus(res.registration === CLIENTDOMESTIC);
        }
      }).catch((e) => {
        console.warn(`api ${apiUrl} catch: ${e}`);
      });
    };
    checkRegistration();
  }, []);

  return (
    <footer className={`jusda-base-footer ${className}`} {...attrs} style={{ textAlign: 'center', ...style }}>
      {registrationStatus ?
        <React.Fragment>
          准时达国际供应链管理有限公司版权所有 粤ICP备 19018545号
          <a target="_blank" className="bei_a" rel="noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002002869" style={{ color: '#939393' }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAFCElEQVQ4T33Ua1BUBRQH8P+9+7p7d9kXuywqCC7yWkVgFGMmhFAQDUNtxERtTB2HMjVLnUYlizJ8TJhNIZn56IOPScY08RH5IBQkc2RJEZDXgosC7vJa7t59XW7Tlkz0Op/OzJn/b86Xcwj8T/F8W6CjpS7r+uXba1ysV5ySEXfIPyb+LEGEW/4rRvzbgGfLUx+WXXm96lJjFs82UY9cNARqFUK0FFgr7U2aaTgf/dLLRwgqrvTv+X+APM9T1z5bwW4vaMSyF3nEyzhMYPohUdMYSE9CjZXGvo1VeH9rCGZvPkkRBOH6KzoK5HlbkKum8Pji3LrkWek0VpE1MO82g08IhERHgymtR8zhdJzRZeL0zgp8eyzpPBG5YDFBTHA+Q0dAF2+O7irdbcrO7RRHpYzBkYQqPPi8FwIMwy0jQY9TwGHqxiDjRvL32Vh3YSLqz5Xj1NHpTwhdQKouamPj7+gIyDNFCUXF5tvrNstxsrABc2srYTluAzlFC3Q74Rl0QzDZH0x1KwwrIvHrsmzMmt2PwgIp1i+i4sUR+aYR0FZ7PUjZW3TywF1j0oZ3XbiQV42YqjawZV3gQtQgxtMACfBmJ1ztT0Alh4LY9wqiEpzI20rjoy1+10GtXU1IVW2+DWu/2/JWBHNzfwmTiVdz3Sg9+BAzu1tRv6MG3pxwyGb4Q2nUgrvrwMCuGwhaboR54QxMTeZQtF+HtbPuwSZbtlNrmP+eD2wuK/jSr+VMbrN+Dp5fqsOGpbX4ZFUHyveYIR9wQWnUQehHgXRy8AYrEbUkGNs+5LDr6zGovKpArP0H9KvmHwt64e2VPrDx1PpOsvWXsQFpz2HS5ih03XqASxk/Ina6Dk+rbHAwLOQGDbztdqhjVehzSJD4jRFyowFNp/rQe/UnYGxMc+jCr8J9YFPJKsZ+p4GOn6HEJlMm9m3vxEUUI2OSGw8Tw9Hbx0AV5g+NH4WA03WouMchFTl4Y8dEHMioxP2KHqgSJrcHpxWH+kDLxQ/OuborskJiDKjvD0PMCgnmdZ7GGkUd/GkvSKUUYgCKiQEYtAtx+KYUxYo03D4xjPggFl3mTkjHxR/QTt3+5p9g/i1nU3miODAAwdFKfHx1KvK2tAJcH8B7kKWwQaMiUdLhhyHQANR4ZxuNwtea8LgJGGZsoMbHVuoSdyX5wK6qPE9/Q7OQt3sgJ3ugTIyDhZHh2iULGsgpmGNsxhipFZ+ej4C7j0VwlD+2zTPD09oEu4cCpRVDbpxmU0fma32ga+jnpdbqPcfZLjdcVg9gaUfYgjhI9BTA2cDZhBjqYaGcoAFC/AGLFW1nG8H6aSE3yCENpKEOz0kRqTMrRi7FO2Rabrtf+AXndCqtN7oglPEITIkG18vC42BA0hQojQyEWARbVQu8nBDKaWHwOGFTRaQskQcuujLq9PrM1amDpqMnKD0TiGERuAEGIpoARGIMe4UQSwGPnQVj6YNErwEVpIer3wHmkd2qmp6Wow1bPRocattbJhD0pLMOAkOtPSA5D0Q04LY7IFYpAdYOpn0ApFwKsU4BkCTEGjkkehoQhZb46Tdkj34Oj+/QT+2X97gf1a0Ucg4ZrZLAy7jhsXsgoIS+XqBRQEAJ4GaHQMq0EGjHd5C04ZBK31JAEPnDo8Bn/6zx4Cbt4NMnc50eS8o4o9bIDfJySk1qRFIpHIN8hzRA4xBqjSZbi/VKZK23jMj/A3pWvwFuUhEzXaaL5AAAAABJRU5ErkJggg==" />
            {record || string}
          </a>
        </React.Fragment> :
        <React.Fragment>Copyright © JUSDA Supply Chain Management International Co.,Ltd. All rights reserved.</React.Fragment>
      }
    </footer>
  );
}

JusdaFooter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  record: PropTypes.object || PropTypes.string,
};

export default JusdaFooter;
