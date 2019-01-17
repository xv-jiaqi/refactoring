import md5 from 'md5';
import CONF, { getAuthByAppNameFn } from '@/config/';

const { stringify, parse } = JSON;

/**
 * 权限查询匹配
 * @param privileges
 * @param md5AuthMap
 */
function authMatch(privileges, md5AuthMap) {
  const AUTH = {};
  const ignore = 'authIgnore',
    AND = 'and';

  Object.entries(md5AuthMap).forEach(([authKey, authSet]) => {
    if (authSet === ignore || authSet.includes(ignore)) {
      AUTH[authKey] = true;
      return;
    }

    if (!Array.isArray(authSet) || authSet.length === 0) {
      return;
    }

    const isAnd = authSet[0] === AND ? !!authSet.shift() : false;

    do {
      const auth = authSet.shift();
      const isNot = /^!/.exec(auth);

      const isInclude = privileges.includes(isNot ? auth.substring(1) : auth);
      const isValid = isNot ? !isInclude : isInclude;

      if (isAnd) {
        if (!isValid) {
          AUTH[authKey] = undefined;
          return;
        }
        AUTH[authKey] = true;
      } else if (isValid) {
        AUTH[authKey] = true;
        return;
      }
    } while (authSet.length);
  });

  return AUTH;
}

/**
 * 权限路径埋点转换成相应的 SN(md5) 码
 * @param authMap
 * @param appName
 */
function path2MD5(authMap, appName) {
  const temp = {};
  const ignoreWords = ['authIgnore', 'and', 'agency', 'client', 'admin'];

  for (const [authKey, authArr] of Object.entries(authMap)) {
    temp[authKey] = [];

    for (const auth of Array.from(authArr)) {
      if (ignoreWords.includes(auth)) {
        temp[authKey].push(auth);
        continue;
      }

      if (/^!/.exec(auth)) {
        const _auth = `${appName}/${auth.substring(1)}`;
        temp[authKey].push(`!${md5(_auth)}`);
        continue;
      }

      temp[authKey].push(md5(`${appName}/${auth}`));
    }
  }

  setTimeout(console.log(temp));
  return temp;
}

/**
 *
 * @param privileges
 * @returns {Promise<any>}
 */
async function authConfig(privileges) {
  const { appName, role } = CONF;

  const authMap = await getAuthByAppNameFn(appName);

  const authMapTag = md5(stringify(authMap)),
    privilegesTag = md5(stringify(privileges));

  const sessionKey = `${authMapTag}${privilegesTag}`;

  if (sessionKey in sessionStorage) {
    return parse(sessionStorage.getItem(sessionKey));
  }

  sessionStorage.clear();

  const md5AuthMap = path2MD5(authMap, appName);

  privileges.push(role);

  const auth = Object.assign(authMatch(privileges, md5AuthMap), {
    [role]: true,
    authIgnore: true,
  });

  sessionStorage.setItem(sessionKey, stringify(auth));

  return auth;
}

export default function(privileges = []) {
  return authConfig(privileges);
}
